import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Input, Select, Tag, theme, Tooltip } from "antd";

const tagInputStyle = {
  width: 120,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};
const TagComponent = ({ options, tagName = "New Tag" }) => {
  const { token } = theme.useToken();

  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");

  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) inputRef.current?.focus();
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputIndex]);

  // ❌ Remove tag
  const handleClose = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  // ➕ Show Select
  const showInput = () => {
    setInputVisible(true);
  };

  // ✅ Add new tag
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  // ✏️ Edit confirm
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
    cursor: "pointer",
  };

  return (
    <Flex gap="small" align="center" wrap>

      <Select
        ref={inputRef}
        size="small"
        style={tagInputStyle}
        value={inputValue}
        options={options}
        onChange={(value) => setInputValue(value)} // ✅ FIX
        onBlur={handleInputConfirm}
        autoFocus
      />
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Select
              ref={editInputRef}
              key={tag}
              size="small"
              options={options}
              style={tagInputStyle}
              value={editInputValue}
              onChange={(value) => setEditInputValue(value)} // ✅ FIX
              onBlur={handleEditInputConfirm}
              autoFocus
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            key={tag}

            closable={(index = 0)}
            style={{ userSelect: "none" }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index == 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );

        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}



    </Flex>
  );
};

export default TagComponent;
