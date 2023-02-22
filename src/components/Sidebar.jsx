import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  ListItem,
  UnorderedList,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { LabelPicker } from "./LabelPicker";

export const Sidebar = ({ setter, activeButton, setActiveButton }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [isLargerThan] = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    if (isLargerThan) {
      onClose();
    }
  }, [isLargerThan, onClose]);

  return (
    <Box as={"aside"} display={{ base: "", md: "none" }}>
      <Box>
        <Icon
          as={HamburgerIcon}
          onClick={onOpen}
          w={10}
          h={10}
          ml={2}
          cursor="pointer"
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
        p="36px"
        isFullHeight="true"
      >
        <DrawerOverlay />
        <DrawerContent bgColor="gray.800">
          <DrawerCloseButton />
          <DrawerHeader>Welcome to versatile!</DrawerHeader>

          <DrawerBody>
            <Box as="nav" fontSize="2xl" fontWeight="extrabold" mb="16px">
              <UnorderedList onClick={() => onClose()}>
                <ListItem listStyleType="none">
                  <Link to="/">Home</Link>
                </ListItem>
                <ListItem as="li" listStyleType="none">
                  <Link to="post">Post</Link>
                </ListItem>
                <ListItem as="li" listStyleType="none">
                  <Link to="user">Users</Link>
                </ListItem>
              </UnorderedList>
            </Box>

            <Box as={"p"} fontSize="2xl" fontWeight="extrabold" mb="24px">
              Categories
            </Box>
            <LabelPicker
              styles={{ base: "flex" }}
              setter={setter}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
