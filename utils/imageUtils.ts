/**
 * Optimizes images by using Imgur's native thumbnail suffixes when possible.
 * This bypasses third-party proxies for Imgur links, resulting in much faster load times.
 * Now enforces WebP format for modern browser performance.
 * 
 * Imgur Suffixes:
 * s = Small Square (90x90) - Good for blur placeholders
 * t = Small Thumbnail (160x160)
 * m = Medium Thumbnail (320x320)
 * l = Large Thumbnail (640x640)
 * h = Huge Thumbnail (1024x1024)
 */
export const getOptimizedImageUrl = (url: string, width: number = 800) => {
  if (!url) return '';
  
  // If it's a data URL or blob, return as is
  if (url.startsWith('data:') || url.startsWith('blob:')) return url;

  // 1. Handle Imgur Native Resizing & WebP Conversion
  if (url.includes('imgur.com')) {
    try {
      const cleanUrl = url.split('?')[0]; 
      
      // Determine suffix based on requested width
      let suffix = '';
      if (width <= 90) suffix = 's'; // Tiny placeholder
      else if (width <= 160) suffix = 't';
      else if (width <= 320) suffix = 'm';
      else if (width <= 640) suffix = 'l';
      else suffix = 'h'; // Max 1024px

      // Regex to insert suffix before the extension AND change extension to .webp
      // Matches: (https://i.imgur.com/ID)(.jpg|.png|.jpeg etc)
      return cleanUrl.replace(/(https?:\/\/i\.imgur\.com\/[a-zA-Z0-9]+)(\.[a-zA-Z]+)/, `$1${suffix}.webp`);
    } catch (e) {
      return url;
    }
  }

  // 2. Handle Unsplash Native API
  if (url.includes('images.unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&q=80&fm=webp`;
  }

  // 3. Fallback to Weserv Proxy for other hosts
  try {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=80&output=webp`;
  } catch (e) {
    return url;
  }
};

export const generateImageSrcSet = (url: string) => {
  if (!url || url.startsWith('data:') || url.startsWith('blob:')) return undefined;

  // Generate native srcsets based on provider
  const small = getOptimizedImageUrl(url, 320);
  const medium = getOptimizedImageUrl(url, 640);
  const large = getOptimizedImageUrl(url, 1024);

  return `${small} 320w, ${medium} 640w, ${large} 1024w`;
};