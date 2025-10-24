<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import toast from "svelte-french-toast";

    let email = "";
    let password = "";
    let error = "";
    let loading = false;

    async function login() {
        error = "";
        loading = true;

        try {
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                toast.success("Login successful!");
                goto("/panel");
            } else {
                const text = await res.text();
                error = text || "Login failed";
                toast.error(error);
            }
        } catch (err) {
            error = "Network error";
            toast.error(error);
        } finally {
            loading = false;
        }
    }
</script>

<div id="fadeInUp">
    <Card.Root class="w-full max-w-sm mx-auto mt-20">
        <Card.Header>
            <Card.Title>Login</Card.Title>
            <Card.Description>
                Please enter your contactmin credentials
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <form on:submit|preventDefault={login} class="space-y-4">
                <div>
                    <Label for="email" class="mb-2">Email</Label>
                    <Input
                        type="email"
                        bind:value={email}
                        placeholder="Email"
                        id="email"
                        required
                    />
                </div>
                <div>
                    <Label for="password" class="mb-2">Password</Label>
                    <Input
                        type="password"
                        bind:value={password}
                        placeholder="Password"
                        id="password"
                        required
                    />
                </div>
                <Button type="submit" disabled={loading} class="w-full">
                    {#if loading}Logging in...{:else}Login{/if}
                </Button>
            </form>
        </Card.Content>
    </Card.Root>
</div>
<style>
  #fadeInUp {
    animation: fadeInUp 0.7s ease-in-out;
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
</style>