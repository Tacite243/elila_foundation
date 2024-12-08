'use client';

import React from 'react';

interface Post {
  image: string;
  date: string;
  title: string;
  author: string;
  category: string;
  link: string;
}

const posts: Post[] = [
  {
    image: '/img/blog/blog-1.jpg',
    date: 'December 12',
    title: 'Eum ad dolor et. Autem aut fugiat debitis',
    author: 'Julia Parker',
    category: 'Politics',
    link: '/blog-details',
  },
  {
    image: '/img/blog/blog-2.jpg',
    date: 'July 17',
    title: 'Et repellendus molestiae qui est sed omnis',
    author: 'Mario Douglas',
    category: 'Sports',
    link: '/blog-details',
  },
  {
    image: '/img/blog/blog-3.jpg',
    date: 'September 05',
    title: 'Quia assumenda est et veritati tirana ploder',
    author: 'Lisa Hunter',
    category: 'Economics',
    link: '/blog-details',
  },
];

const RecentPosts: React.FC = () => {
  return (
    <section id="recent-posts" className="recent-posts section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Recent Posts</h2>
        <p>Necessitatibus eius consequatur</p>
      </div>

      {/* Posts Grid */}
      <div className="container">
        <div className="row gy-5">
          {posts.map((post, index) => (
            <div
              key={index}
              className="col-xl-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="post-item position-relative h-100">
                {/* Post Image */}
                <div className="post-img position-relative overflow-hidden">
                  <img
                    src={post.image}
                    className="img-fluid"
                    alt={post.title}
                  />
                  <span className="post-date">{post.date}</span>
                </div>

                {/* Post Content */}
                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">{post.title}</h3>
                  <div className="meta d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person"></i>
                      <span className="ps-2">{post.author}</span>
                    </div>
                    <span className="px-3 text-black-50">/</span>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-folder2"></i>
                      <span className="ps-2">{post.category}</span>
                    </div>
                  </div>
                  <hr />
                  <a
                    href={post.link}
                    className="readmore stretched-link"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
