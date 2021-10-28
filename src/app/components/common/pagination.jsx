import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// sfc - функциональный компонент
const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  // чтобы отобразить данные, нужен массив номеров страниц [1, 2, 3, ...]
  // для его создания устанавливаем библиотеку lodash     npm i lodash@4.17.15
  const pages = _.range(1, pageCount + 1);

  if (pageCount === 1) return null;
  //   console.log({ currentPage });
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={"page-item" + (page === currentPage ? " active" : "")}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  // если передан другой тип данных - ошибка-предупреждение в консоли
  // только в режиме разработчика
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;

// перед реализацией переиспользуемого компонента нужно решить,
// какие входные данные получает компонент, и какие события нужны
// лучший вариант - использовать компонент до его реализации (зд. - импортировать в users)
