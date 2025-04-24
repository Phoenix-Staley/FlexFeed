document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('title');
  const bodyInput = document.getElementById('body');
  const mediaInput = document.getElementById('avatar');

  window.addPost = async function (event) {
    event.preventDefault();

    if (!titleInput || !bodyInput) {
      console.error('Required form fields not found!');
      return;
    }

    const title = titleInput.value.trim();
    const content = bodyInput.value.trim();

    if (!title || !content) {
      alert('Please enter both a title and post content!');
      return;
    }

    const postData = {
      title: title,
      post_body: content
    };

    if (mediaInput && mediaInput.files.length > 0) {
      const file = mediaInput.files[0];
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (isImage || isVideo) {
        postData.type = isImage ? 'image' : 'video';

        const formData = new FormData();
        formData.append('media', file);

        try {
          const uploadResponse = await fetch('/api/media/upload', {
            method: 'POST',
            body: formData
          });

          console.log("📡 uploadResponse.status:", uploadResponse.status);

          const uploadResult = await uploadResponse.json();
          console.log("📦 uploadResult:", uploadResult);

          if (uploadResult.success && uploadResult.fileUrl) {
            postData.media = uploadResult.fileUrl;
          } else {
            throw new Error(uploadResult.message || 'Media upload failed');
          }
        } catch (error) {
          console.error('❌ Error uploading media to S3:', error);
          alert('Failed to upload media. Post will be created without media.');
        }
      }
    }

    try {
      console.log("📤 Final postData being sent:", postData);
    
      const response = await fetch('/api/post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
    
      console.log("📡 /api/post response:", response);
    
      // Read raw body first
      const rawText = await response.text();
    
      try {
        const result = JSON.parse(rawText); // ✅ Only parse if valid
        console.log("✅ Post creation result:", result);
    
        // Clear form and redirect
        titleInput.value = '';
        bodyInput.value = '';
        if (mediaInput) mediaInput.value = '';
        window.location.href = '/';
      } catch (jsonErr) {
        console.error('❌ JSON parse failed – raw HTML likely returned:');
        console.log(rawText); // 👀 this is what we want to see
        throw new Error(`Unexpected server response (likely 500 error)`);
      }
    } catch (error) {
      console.error('❌ Error creating post:', error);
      alert('Failed to create post: ' + error.message);
    }
  };
});
