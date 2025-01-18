import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
// import Sorting from "./Sorting";
import { FaUndo } from "react-icons/fa";
import { IoMdSwitch } from "react-icons/io";
// import Popup from "../../utils/Popup";

const restaurantReviews = [
  {
    id: 1,
    imgSrc: "https://randomuser.me/api/portraits/men/10.jpg",
    altText: "Profile of Michael Scott",
    rating: 4.5,
    reviewer: "Michael Scott",
    reviewContent:
      "The ambiance was amazing, and the food was delicious! The staff was friendly, and the service was quick. I’ll definitely come back again.",
  },
  {
    id: 2,
    imgSrc: "https://randomuser.me/api/portraits/women/12.jpg",
    altText: "Profile of Pam Beesly",
    rating: 4.0,
    reviewer: "Pam Beesly",
    reviewContent:
      "Great experience overall. The pasta was perfectly cooked, but the dessert options could use some variety. Still, a solid choice for dinner.",
  },
  {
    id: 3,
    imgSrc: "https://randomuser.me/api/portraits/men/15.jpg",
    altText: "Profile of Jim Halpert",
    rating: 3.8,
    reviewer: "Jim Halpert",
    reviewContent:
      "Decent food but slightly overpriced for the portion sizes. The location is convenient, though, and the atmosphere is cozy.",
  },
  {
    id: 4,
    imgSrc: "https://randomuser.me/api/portraits/women/20.jpg",
    altText: "Profile of Angela Martin",
    rating: 5.0,
    reviewer: "Angela Martin",
    reviewContent:
      "Absolutely loved it! The chef's special was out of this world, and the attention to detail in every dish was impressive. Highly recommend!",
  },
  {
    id: 5,
    imgSrc: "https://randomuser.me/api/portraits/men/30.jpg",
    altText: "Profile of Dwight Schrute",
    rating: 4.2,
    reviewer: "Dwight Schrute",
    reviewContent:
      "Great selection of farm-to-table dishes. The beet salad was the highlight of my meal. Would definitely visit again.",
  },
];

const CommentList = () => {
  let [column, setColumn] = useState(1);
  let [reviews, setReviews] = useState(restaurantReviews);

  // Function to sort by rating
  const sortReviewsByRating = () => {
    return [...reviews].sort((a, b) => b.rating - a.rating);
  };

  const handleRatingSort = () => {
    if (JSON.stringify(sortReviewsByRating()) == JSON.stringify(reviews)) {
      setReviews(restaurantReviews);
    } else {
      setReviews((prev) => sortReviewsByRating());
    }
  };

  const handleAccept = () => {};
  const handleReject = () => {};
  const navigateTo = () => {};
  const list = ["Latest", "Oldest", "Worst", "Best"];

  return (
    <div>
      <h1 className="heading flex justify-between">
        Comments{" "}
        <div className="flex justify-end gap-1">
          <button
            className="rounded-full border-0 gap-1 text-[14px] mb-2 px-2 py-1 bg-gray-100"
            onClick={() => setColumn((prev) => (prev === 1 ? 2 : 1))}
          >
            <IoMdSwitch />
          </button>
          <button className="rounded-2xl border-0 gap-1 text-[14px] mb-2 px-2 py-1 bg-gray-100">
            <FaUndo />
          </button>
          <button
            className="rounded-2xl border-0 gap-1 text-[14px] mb-2 px-2 py-1 bg-gray-100"
            onClick={handleRatingSort}
          >
            Rating
          </button>
          {/* <Sorting list={list} /> */}
          <button
            className="rounded-2xl border-0 gap-1 text-[14px] mb-2 px-2 py-1 bg-gray-100"
            onClick={() => navigateTo()}
          >
            More
          </button>
        </div>
      </h1>

      <div
        className={`grid m-2  gap-2 ${
          column === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2"
        } grid-cols-1`}
      >
        {reviews.map((review) => (
          // comment card
          <div
            key={review.id}
            className="border border-gray-200 shadow-sm bg-white rounded-lg p-4 w-auto"
          >
            <div className="flex gap-2 ">
              {/* image group */}
              <div className="flex flex-col items-center justify-center">
                <img
                  src={review.imgSrc}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full bg-gray-100"
                />
                <div className={`text-center ${"text-[10px]"}`}>
                  {review.reviewer}
                </div>
              </div>
              {/* rating */}
              <div className="flex flex-col">
                <div className="text-[12px] border flex w-[50px] rounded-lg items-center justify-center">
                  <IoIosStar className="text-black" />
                  &nbsp; {review.rating}
                </div>
                <div className="text-[11px]">2 days before</div>
              </div>
              {column === 1 && (
                <div>
                  <div className="text-[12px]">
                    {review.reviewContent.slice(0, 120)}
                  </div>
                </div>
              )}

              {/* action button */}
              <div className=" font-semibold flex gap-2 mt-2 flex-grow justify-end h-full">
                <button
                  title="accept"
                  className="border-0 bg-transparent items-start flex h-0 rounded"
                >
                  <IoCheckmarkSharp className="text-[32px] text-green-500 bg-gray-50 rounded p-1" />
                </button>
                <button
                  title="reject"
                  className="border-0 bg-transparent items-start flex h-0 rounded"
                >
                  <IoCloseSharp
                    className=" text-[32px] text-red-500 bg-gray-50 rounded p-1"
                    title="reject"
                  />
                </button>
              </div>
            </div>
            {column === 2 && (
              <div>
                <div className="text-sm p-2">
                  {review.reviewContent.slice(0, 120)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;