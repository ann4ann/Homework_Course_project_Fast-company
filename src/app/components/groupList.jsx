import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    // console.log(items);
    // console.log(Object.keys(items));

    // т.к. в объекте нет метода map, мы не можем его применять к items
    // поэтому используем Object.keys
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                // <li key={items[item]._id} className="list-group-item">
                <li
                    key={items[item][valueProperty]}
                    className={
                        "list-group-item" +
                        (items[item] === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(items[item])}
                    // чтобы менялся курсор:
                    role="button"
                >
                    {/* {items[item].name} */}
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
