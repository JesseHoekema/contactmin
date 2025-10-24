<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import Arrow from "@lucide/svelte/icons/arrow-left";
  import { Button } from "$lib/components/ui/button/index.js";
  import Reply from "@lucide/svelte/icons/corner-up-right";
  import Trash from "@lucide/svelte/icons/trash-2";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";

  const { data } = $props();

  async function deleteSubmission(id: number) {
    try {
      const res = await fetch("/api/actions/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        toast.success("Message deleted successfully");
        goto("/panel");
      } else {
        toast.error("Failed to delete message");
        console.error("Failed to delete message:", await res.text());
      }
    } catch (error) {
      toast.error("Error deleting message");
      console.error("Error deleting message:", error);
    }
  }
</script>
<svelte:head>
    <title>Contactmin - Message from {data.submission.name}</title>
</svelte:head>

<div id="fadeIn">
  <Button
    href="/panel"
    variant="ghost"
    class="fixed top-4 left-4 z-10"
  >
    <Arrow class="mr-2" />
    Back to Inbox
  </Button>
</div>
<div id="fadeInUp">
  <Card.Root class="max-w-3xl mx-auto mt-18">
    <Card.Header>
      <div class="flex gap-4 items-center">
        <Avatar.Avatar class="w-20 h-20 text-3xl">
          <Avatar.Fallback>
            {data.submission.name.charAt(0)}
          </Avatar.Fallback>
        </Avatar.Avatar>

        <div>
          <Card.Title class="text-3xl mb-1">{data.submission.name}</Card.Title>
          <p class="mb-1">{data.submission.email}</p>
          <p class="text-muted-foreground text-base">
            {new Date(data.submission.createdAt).toLocaleString("nl-NL", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
      <div class="w-full border-t text-muted-foreground mt-2"></div>
    </Card.Header>

    <Card.Content class="space-y-4">
      <p>{data.submission.message}</p>
      <div class="w-full border-t text-muted-foreground mt-2"></div>
    </Card.Content>
    <Card.Footer>
      <div class="flex gap-4">
        <Button
          href={`mailto:${data.submission.email}?subject=Reply to your message`}
        >
          <Reply />Reply via Email</Button
        >
        <Button
          variant="destructive"
          onclick={() => deleteSubmission(data.submission.id)}
          ><Trash /> Delete Message</Button
        >
      </div>
    </Card.Footer>
  </Card.Root>
</div>

<style>
  #fadeInUp {
    animation: fadeInUp 0.5s ease-in-out;
  }
  #fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
