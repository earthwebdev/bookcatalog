import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-grid-carousel";
import CardTypeTestimonials from "./CardTypeTestimonials";
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    setTestimonials([
      {
        name: "Borivoje",
        text: "Udemy is a life saver. I don't have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I'm really close.",
      },
      {
        name: "Dinesh",
        text: "I believe in lifelong learning and Udemy is a great place to learn from experts. I've learned a lot and recommend it to all my friends.",
      },
      {
        name: "Kathy",
        text: "My children and I LOVE Udemy! The courses are fantastic and the instructors are so fun and knowledgeable. I only wish we found it sooner.",
      },
      {
        name: "Zulaika",
        text: "I work in project management and joined Udemy because I get great courses for less. The instructors are fantastic, interesting, and helpful. I plan to use Udemy for a long time! ",
      },
      {
        name: "Macro",
        text: "Thank you Udemy! You've renewed my passion for learning and my dream of becoming a web developer.",
      },
      {
        name: "Justin",
        text: "The best part about Udemy is the selection. You can find a course for anything you want to learn!",
      },
    ]);
  }, []);
  return (
    <section className="text-neutral-700 dark:text-neutral-300 bg-white">
      <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
            <h3
                className="mb-6 text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                Testimonials
            </h3>
            <p className="mb-6 pb-2 md:mb-12 md:pb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error
                amet numquam iure provident voluptate esse quasi, veritatis totam
                voluptas nostrum quisquam eum porro a pariatur veniam.
            </p>
            </div>
      <Carousel
        cols={3}
        containerStyle={{ maxWidth: "1300px", margin: "0 auto" }}
      >
        {testimonials.map(({ name, text }, i) => (
          <Carousel.Item key={i}>
            <CardTypeTestimonials dataname={name} datatext={text} />            
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonials;
