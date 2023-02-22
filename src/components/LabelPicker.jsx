import { Tag, TagLabel, UnorderedList } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../store/slices/posts.js";

export const LabelPicker = ({
  setter,
  styles,
  onClose,
  activeButton,
  setActiveButton,
}) => {
  const reactionEmoji = {
    Clear: "❌",
    Politics: "⚖️",
    News: "🕵️",
    Lifestyle: "🎇",
    Sports: "🏆",
    Science: "🦾",
    Art: "🎨",
    IT: "👩🏽‍💻",
  };

  const posts = useSelector(selectAllPosts);

  const handleTagClick = (label, index) => {
    setter(label);
    setActiveButton(index);
    onClose();
  };

  const allLabels = posts.map((post) => post.category);
  const uniqueLabels = [...new Set(allLabels)].map((label, index) => (
    <Tag
      size="xl"
      colorScheme={activeButton === index + 1 ? "teal" : "red"}
      borderRadius="full"
      px="24px"
      py="12px"
      cursor="pointer"
      width={{ base: "60%", md: "inherit" }}
      key={index}
      _hover={{
        fontWeight: "bold",
        transform: "scale(1.02)",
      }}
      onClick={() => handleTagClick(label, index + 1)}
    >
      {reactionEmoji[label]}
      <TagLabel ml={{ base: "12px", md: "3px" }}>{label}</TagLabel>
    </Tag>
  ));

  return (
    <UnorderedList
      display={styles}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      gap="10"
      fontSize="1.2em"
      listStyleType="none"
      mx={{
        base: "24px",
        md: "48px",
        lg: "80px",
      }}
      flexWrap="wrap"
    >
      <Tag
        size="xl"
        colorScheme={activeButton === 0 ? "teal" : "red"}
        borderRadius="full"
        px="24px"
        py="12px"
        cursor="pointer"
        width={{ base: "60%", md: "inherit" }}
        _hover={{
          fontWeight: "bold",
          transform: "scale(1.02)",
        }}
        onClick={() => handleTagClick("", 0)}
      >
        {reactionEmoji["Clear"]}
        <TagLabel ml={{ base: "12px", md: "3px" }}>Clear</TagLabel>
      </Tag>
      {uniqueLabels}
    </UnorderedList>
  );
};
