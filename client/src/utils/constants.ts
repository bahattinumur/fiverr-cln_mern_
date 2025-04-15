export const toggler =
  "group peer ring-0 text-xs bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-16 h-6  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-4 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95";

export const inputs = [
  {
    label: "Title",
    name: "title",
    isReq: true,
  },
  {
    label: "Description",
    name: "desc",
    isReq: true,
  },
  {
    label: "Category",
    name: "category",
    isReq: true,
  },
  {
    label: "Cover",
    name: "cover",
    type: "file",
    isReq: true,
  },
  {
    label: "Images",
    name: "images",
    type: "file",
    isMulti: true,
  },
  {
    label: "Short Title",
    name: "shortTitle",
    isReq: true,
  },
  {
    label: "Short Description",
    name: "shortDesc",
    isReq: true,
  },
  {
    label: "Revison Number",
    name: "revisionNumber",
    type: "number",
    isReq: true,
  },
  {
    label: "Delivery Time",
    name: "deliveryTime",
    type: "number",
    isReq: true,
  },
  {
    label: "Price",
    name: "price",
    type: "number",
    isReq: true,
  },
];

export const cards = [
  {
    title: "Stick to your budget",
    text: "Find the right service for every price point. No hourly rates, just project-based pricing",
  },
  {
    title: "Get quality work done quickly",
    text: "Hand your project over to a talented freelancer in minutes, get long-lasting results",
  },
  {
    title: "Pay when you're happy",
    text: "Upfront quotes mean no surprises. Payments only get released when you approve.",
  },
  {
    title: "Count on 24/7 support    ",
    text: "Our round-the-clock support team is available to help anytime, anywhere. ",
  },
];
