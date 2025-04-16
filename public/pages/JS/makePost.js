// makePost.js
document.addEventListener('DOMContentLoaded', () => {
  // Get form elements
  const titleInput = document.getElementById('title');
  const bodyInput = document.getElementById('body');
  const mediaInput = document.getElementById('avatar');
  
  // Define the addPost function that's called in the HTML
  window.addPost = async function(event) {
    event.preventDefault();
    
    // Validate inputs
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
    
    // Prepare post data
    const postData = {
      title: title,
      content: content
    };
    
    // Handle media upload if a file is selected
    if (mediaInput && mediaInput.files.length > 0) {
      const file = mediaInput.files[0];
      
      // Determine media type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (isImage || isVideo) {
        postData.type = isImage ? 'image' : 'video';
        
        // Create FormData for S3 upload
        const formData = new FormData();
        formData.append('media', file);
        
        try {
          // Upload media to S3 first
          const uploadResponse = await fetch('/api/media/upload', {
            method: 'POST',
            body: formData
          });
          
          if (!uploadResponse.ok) {
            throw new Error('Media upload failed');
          }
          
          const uploadResult = await uploadResponse.json();
          
          if (uploadResult.success && uploadResult.url) {
            postData.media = uploadResult.url;
          }          
          else {
            throw new Error(uploadResult.message || 'Media upload failed');
          }
        } catch (error) {
          console.error('Error uploading media to S3:', error);
          alert('Failed to upload media. Post will be created without media.');
        }
      }
    }
    
    // Submit the post data - use POST method as specified in the requirements
    try {
      const response = await fetch('/api/post/', {
        method: 'POST', // Changed from PUT to POST as per the requirements
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create post: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Success! Clear form and redirect
      alert('Post created successfully!');
      titleInput.value = '';
      bodyInput.value = '';
      if (mediaInput) mediaInput.value = '';
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post: ' + error.message);
    }
  };
});