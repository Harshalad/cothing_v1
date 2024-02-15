// import classnames from "classnames";
// import { usePagination, DOTS } from "./usePagination";
// import { useState } from "react";

// const Pagination = (props) => {
//   const {
//     onPageChange,
//     totalCount,
//     siblingCount = 1,
//     currentPage,
//     pageSize,
//     className,
//   } = props;

//   const paginationRange = usePagination({
//     currentPage,
//     totalCount,
//     siblingCount,
//     pageSize,
//   });

//   const [pageArr, setPageArr] = useState([1, 2, 3, 4, 5]);
//   const [answeredArr, setAnsweredArr] = useState([1, 3, 5]);

//   if (currentPage === 0 || paginationRange.length < 2) {
//     return null;
//   }

//   const onNext = () => {
//     onPageChange(currentPage + 1);
//   };

//   const onPrevious = () => {
//     onPageChange(currentPage - 1);
//   };

//   let lastPage = paginationRange[paginationRange.length - 1];
//   return (
//     <>
//     <ul>
//       {pageArr.map((pageNumb) =>
//         <li 
//           // className={
//           //   answeredArr.map((answeredNumber) => pageNumb === answeredNumber ? "abc" : "none" ))
//           // }
//         >
//           {pageNumb}
//         </li>
//         )}
//     </ul>
//     <ul
//       className={classnames("pagination-container", { [className]: className })}
//     >
//         <li
//           className={classnames("pagination-item", {
//             disabled: currentPage === 1,
//           })}
//           onClick={onPrevious}
//         >
//           <div className="arrow left" />
//         </li>
//         {paginationRange.map((pageNumber) => {
//           if (pageNumber === DOTS) {
//             return <li className="pagination-item dots">&#8230;</li>;
//           }
//           return (
//             <li
//               className={classnames("pagination-item", {
//                 selected: pageNumber === currentPage,
//                 answered: pageNumber === answeredArr[0],
//               })}
//               onClick={() => onPageChange(pageNumber)}
//             >
//               {pageNumber}
//             </li>
//           );
//         })}
//         <li
//           className={classnames("pagination-item", {
//             disabled: currentPage === lastPage,
//           })}
//           onClick={onNext}
//         >
//           <div className="arrow right" />
//         </li>
//       </ul></>
//   );
// };

// export default Pagination;