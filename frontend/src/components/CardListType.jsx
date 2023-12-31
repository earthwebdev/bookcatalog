import React from "react";

const CardListType = (props) => {
  const { title, description, image, hrefLink } = props.data;
  //console.log(props, title, description);
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-8 sm:mb-12 md:mb-8 lg:mb-4 sm:me-12 md:me-8 le:me-4">
        <a href={hrefLink} title={title}>
          <img className="rounded-t-lg" src={image} alt={title} />
        </a>
        <div className="p-5">
          <a href={hrefLink}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title?.length > 18?title.slice(0,18)+'...':title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description?.length > 30?description.slice(0,30)+'...':description}
          </p>
          <a
            href={hrefLink}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default CardListType;
