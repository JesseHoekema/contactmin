<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import Arrow from "@lucide/svelte/icons/arrow-right";
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import Logout from "@lucide/svelte/icons/log-out";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";

  const { data } = $props();

  let submissionCount = data.submissions.length;

  async function logout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        window.location.href = "/login";
        console.log("Logged out successfully");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
</script>

<div class="m-6">
  <div class="mt-4 mb-6 flex items-center justify-between" id="fadeIn">
    <h1 class="text-4xl font-bold mb-2">Contactmin Inbox</h1>

    <ButtonGroup.Root class="flex">
      <Button variant="outline">
        {submissionCount} Messages
      </Button>
      <Button onclick={toggleMode} variant="outline" size="icon">
        <SunIcon
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
        />
        <MoonIcon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
      <Button variant="outline" size="icon" onclick={logout}>
        <Logout />
      </Button>
    </ButtonGroup.Root>
  </div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
    id="fadeInUp"
  >
    {#each data.submissions as submission}
      <a href={`/panel/read/${submission.id}`}>
        <Card.Root class="group transition-shadow shadow-md hover:shadow-lg">
          <Card.Header>
            <Card.Title>
              <div class="flex gap-3">
                <Avatar.Root class="w-12 h-12">
                  <Avatar.Fallback>
                    {submission.name.charAt(0)}
                  </Avatar.Fallback>
                </Avatar.Root>
                <div>
                  <p class="text-xl">{submission.name}</p>
                  <p class="text-muted-foreground font-normal text-sm">
                    {submission.email}
                  </p>
                </div>
              </div>
            </Card.Title>
            <div class="w-full border-t text-muted-foreground mt-4"></div>
          </Card.Header>
          <Card.Content class="m-0 space-y-1 flex justify-between items-center">
            <p class="text-muted-foreground text-sm">
              {new Date(submission.createdAt).toLocaleString("nl-NL", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div
              class="p-2 rounded-sm transition-transform group-hover:translate-x-1 cursor-pointer inline-flex items-center justify-center"
            >
              <Arrow class="w-5 h-5 text-foreground" />
            </div>
          </Card.Content>
        </Card.Root>
      </a>
    {/each}
  </div>
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
