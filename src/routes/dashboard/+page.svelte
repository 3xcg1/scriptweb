<script>
    import { uploadMedia } from '../../utilities/s3-uploader.js';
    import { goto } from '$app/navigation';
    import { getTokenFromLocalStorage } from '../../utilities/authentication.js';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { get } from 'svelte/store';
    import { writable } from 'svelte/store';

    let formErrors = {};
    let clicked = false;
    let selectedFiles = writable([]);

    function postUpload() {
        goto('/');
    }

    function handleFileSelection(event) {
        selectedFiles.set([...event.target.files]);
    }

    function removeFile(index) {
        selectedFiles.update(files => {
            files.splice(index, 1);
            return files;
        });
    }

    // async function uploadFile(evt) {
    //     evt.preventDefault();
    //     clicked = true;
    //     const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
    //     const token = getTokenFromLocalStorage();

    //     const fileData = {
    //         title: evt.target['title'].value,
    //         description: evt.target['description'].value,
    //         price: parseInt(evt.target['price'].value * 100),
    //         url: fileUrl
    //     };

    //     const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/file', {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`
    //         },
    //         body: JSON.stringify(fileData)
    //     });

    //     if (resp.status === 200) {
    //         postUpload();
    //     }
    // }

    async function uploadFile(evt) {
        evt.preventDefault();
        clicked = true;
        const token = getTokenFromLocalStorage();

        selectedFiles.subscribe(async files => {
            const promises = files.map(async (file) => {
                const [fileName, fileUrl] = await uploadMedia(file);
                const fileData = {
                    title: evt.target['title'].value,
                    description: evt.target['description'].value,
                    url: evt.target['price'].value,// check this as previous is price
                    url: fileUrl
                };

                const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/file', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(fileData)
                });

                return resp;
            });

            const responses = await Promise.all(promises);

            if (responses.every(resp => resp.status === 200)) {
                postUpload();
            } else {
                // Handle errors if any of the uploads failed
                console.error('Some files failed to upload');
            }
        });
    }
</script>

<svelte:head> 
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<h1 class="text-center text-xl">
    Dashboard URL
</h1>

<div class="flex justify-center items-center mt-8">
    <form on:submit={uploadFile} class="w-1/3">
        <!-- Form fields for title, description, price, and file input -->
        <div class="form-control w-full">
            <label class="label" for="title">
                <span class="label-text"> 
                    Title 
                </span>
            </label>
            <input
                type="text"
                name="title"
                placeholder="File title"
                class="input input-bordered w-full"
            />
            {#if 'title' in formErrors}
                <label class="label" for="title">
                    <span class="label-text-alt text-red-500">
                        {formErrors['title'].message}
                    </span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="description">
                <span class="label-text"> 
                    Description
                </span>
            </label>
            <input
                type="description"
                name="description"
                placeholder="Description of the file"
                class="input input-bordered w-full"
                required
            />
            {#if 'description' in formErrors}
                <label class="label" for="description">
                    <span class="label-text-alt text-red-500">
                        {formErrors['description'].message}
                    </span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="GitHub URL">
                <span class="label-text"> 
                    GitHub URL
                </span>
            </label>
            <input
                type="url"
                name="url"
                placeholder="GitHub URL"
                class="input input-bordered w-full"
                required
            />
            {#if 'url' in formErrors}
                <label class="label" for="url">
                    <span class="label-text-alt text-red-500">
                        {formErrors['url'].message}
                    </span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full mt-2">
            <input type="file" name="file" multiple on:change={handleFileSelection} />
            {#if 'file' in formErrors}
                <label class="label" for="file">
                    <span class="label-text-alt text-red-500">
                        {formErrors['file']}
                    </span>
                </label>
            {/if}
        </div>
        
        <div class="form-control w-full mt-4">
            <button class="btn btn-md">
                Upload
            </button>
        </div>
    </form>
</div>

<div class="flex justify-center items-center mt-8">
    {#if $selectedFiles.length > 0}
        <div class="w-1/3">
            <h2 class="text-center text-xl mb-4">
                Selected Files
            </h2>
            {#each $selectedFiles as file, index}
                <div class="mb-4 p-2 border rounded">
                    <p class="mb-2">
                        {file.name}
                    </p>
                    <button class="btn btn-secondary" on:click={() => removeFile(index)}>
                        X
                    </button>
                </div>
            {/each}
        </div>
    {/if}
</div>