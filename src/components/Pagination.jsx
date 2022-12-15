import { ReactComponent as ArrowRight } from "../assets/svg/arrowright.svg";
import { ReactComponent as ArrowLeft } from "../assets/svg/arrowleft.svg";

const Pagination = ({
  usersPerPage,
  totalUsers,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav-pagination" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          1-10
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalUsers}
        </span>
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <span className="pagination-left" onClick={prevPage}>
            <span className="sr-only">Previous</span>
            <ArrowLeft />
          </span>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className="cursor-pointer"
          >
            <span className="pagination_number">
              <span
                className={
                  currentPage === number ? "text-violet-500" : "text-gray-100"
                }
              >
                {number}
              </span>
            </span>
          </li>
        ))}
        <li>
          <span className="pagination-right" onClick={nextPage}>
            <span className="sr-only">Next</span>
            <ArrowRight />
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
