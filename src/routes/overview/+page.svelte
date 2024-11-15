<script>
    export let data;
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { getUserId, getTokenFromLocalStorage, isLogged } from '../../utilities/authentication.js';
    import { goto } from '$app/navigation';

    const userId = getUserId();

    async function checkout(id) {
        const resp = await fetch (PUBLIC_BACKEND_BASE_URL + '/checkout', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
        });
        const res = await resp.json();
        goto(res);
    }

    async function deleteFile(id) {
        const token = getTokenFromLocalStorage();
        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/file/${data.file.id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({id})
        });
        console.log(resp.status);
        if (resp.status === 200) {
            goto('/');
        } else {
            goto(`/file?id=${data.file.id}`);
        }
    }
</script>

<body class="min-h-screen flex items-center justify-center ">
    <div class="flex items-center">
        <div class="max-w-screen-lg p-8 space-x-4">
            <div class="relative flex-shrink-0 rounded-xl overflow-hidden w-1/2">
                <a href={data.file.url} target="_blank" class="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110">
                    {data.file.name}
                </a>
            </div>
            <div class="mt-2">
                {#if $isLogged && (userId === data.file.userId)}
                    <button on:click={deleteFile(data.file.id)} class="btn btn-primary hover:animate-pulse hover:btn-secondary">
                        Delete
                    </button>
                {/if}
            </div>
        </div>
        <div class="lg:w-2/3 lg:mt-0 lg:mx-6 mb-40">
            <p class="text-3xl font-extrabold uppercase mb-5">
                {data.file.title}
            </p>
            <br>
            <p class="mt-3 mb-5 text-2xl">
                {data.file.description}
            </p>
            <br>
            <p class="mt-3 mb-5 text-2xl">
                USD {data.file.price / 100}
            </p>
            <br>
            <div class="flex items-center mt-6">
                <button on:click={checkout(data.file.id)} class="btn btn-primary hover:btn-accent" type="submit">
                    Buy Now
                </button>
            </div>
        </div>
    </div>
</body>