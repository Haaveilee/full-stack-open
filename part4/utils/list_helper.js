const dummy = (blogPosts) => {
    // You can perform any operations on the array if needed
    // For this example, we'll just return the value 1
    return 1;
}
const totalLikes = (blogPosts) => {



    if (blogPosts.length === 0) {
        return 0;
    }
    // Initialize the total likes count
    let total = 0;

    // Loop through each blog post and sum up the likes
    blogPosts.forEach(post => {
        total += post.likes; // If likes are not defined, default to 0
    });

    // Return the total sum of likes
    return total;
}

const favoriteBlog = (blogPosts)=> {
    if (blogPosts.length === 0) {
        return undefined;
    }

    // Initialize variables to track the favorite blog
    let maxLikes = -1; // Set initial value to -1 to handle the case where all likes are 0
    let favoriteBlog;

    // Loop through each blog post to find the one with the most likes
    blogPosts.forEach(post => {
        if (post.likes > maxLikes) {
            maxLikes = post.likes;
            favoriteBlog = post;
        }
    });

    // Return the favorite blog
    return favoriteBlog;

}
const mostBlogs = (blogPosts)=> {
    // If the list of blog posts is empty, return undefined
    if (blogPosts.length === 0) {
        return undefined;
    }

    // Create an object to store the count of blogs for each author
    const authorCounts = {};

    // Loop through each blog post and count the number of blogs for each author
    blogPosts.forEach(post => {
        const author = post.author;
        if (author in authorCounts) {
            authorCounts[author]++;
        } else {
            authorCounts[author] = 1;
        }
    });

    // Find the author with the largest number of blogs
    let topAuthor;
    let maxBlogs = -1; // Set initial value to -1 to handle the case where all counts are 0
    for (const author in authorCounts) {
        if (authorCounts[author] > maxBlogs) {
            maxBlogs = authorCounts[author];
            topAuthor = author;
        }
    }

    // Return the top author and the number of blogs they have
    return { author: topAuthor, blogs: maxBlogs };
}

const mostLikes = (blogPosts)=> {
    // If the list of blog posts is empty, return undefined
    if (blogPosts.length === 0) {
        return undefined;
    }

    // Create an object to store the total likes for each author
    const authorLikes = {};

    // Loop through each blog post and sum up the likes for each author
    blogPosts.forEach(post => {
        const author = post.author;
        const likes = post.likes || 0; // If likes are not defined, default to 0
        if (author in authorLikes) {
            authorLikes[author] += likes;
        } else {
            authorLikes[author] = likes;
        }
    });

    // Find the author with the largest total number of likes
    let topAuthor;
    let maxLikes = -1; // Set initial value to -1 to handle the case where all likes are 0
    for (const author in authorLikes) {
        if (authorLikes[author] > maxLikes) {
            maxLikes = authorLikes[author];
            topAuthor = author;
        }
    }

    // Return the top author and the total number of likes they have received
    return { author: topAuthor, likes: maxLikes };
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}