export const getPostDate = (postDate) => {
    const datePosted = new Date(postDate);
    const timeNow = new Date();
    const millisec = Math.floor(timeNow - datePosted);
    const sec = Math.floor(millisec / 1000);
    if (sec > 59) {
      const min = Math.floor(sec / 60);
      if (min > 59) {
        const hours = Math.floor(min / 60);
        if (hours > 23) {
          const days = Math.floor(hours / 24);
          if (days > 30) {
            const months = Math.floor(days / 30);
            if (months > 11) {
              return datePosted.toLocaleDateString("en-us", {
                day: "numeric",
                year: "numeric",
                month: "short",
              });
            } else {
              return `${months}month ago`;
            }
          } else {
            return `${days}days ago`;
          }
        } else {
          return `${hours}h ago`;
        }
      } else {
        return `${min}min ago`;
      }
    } else {
      return `few seconds ago`;
    }
  };