// makePost.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('makePostForm');
    
    if (!form) {
      console.error('makePostForm not found on the page!');
      return;
    }
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Get the text content
      const contentInput = document.getElementById('content');
      const contentValue = contentInput ? contentInput.value : '';
      
      // Get the file (if any)
      const fileInput = document.getElementById('mediaFile');
      let imageUrl = null;
  
      // 1) If the user selected a file, upload it to S3 first
      if (fileInput && fileInput.files.length > 0) {
        const formData = new FormData();
        // The field name in FormData must match `upload.single('media')` in mediaRoutes.js
        formData.append('media', fileInput.files[0]);
  
        try {
          const uploadRes = await fetch('/api/media/upload', {
            method: 'POST',
            body: formData,
          });
          const uploadData = await uploadRes.json();
          
          if (uploadData.success) {
            imageUrl = uploadData.fileUrl; // S3 URL
          } else {
            alert('File upload failed: ' + (uploadData.message || 'Unknown error'));
            return;
          }
        } catch (err) {
          console.error('Error uploading file:', err);
          alert('Error uploading file to S3.');
          return;
        }
      }
  
      // 2) Now create the post with content + optional imageUrl
      try {
        const createRes = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: contentValue, imageUrl }),
        });
        const createData = await createRes.json();
  
        if (createData.success) {
          alert('Post created successfully!');
          // Clear the form
          if (contentInput) contentInput.value = '';
          if (fileInput) fileInput.value = '';
        } else {
          alert('Failed to create post: ' + (createData.message || 'Unknown error'));
        }
      } catch (err) {
        console.error('Error creating post:', err);
        alert('Error creating post!');
      }
    });
  });
  