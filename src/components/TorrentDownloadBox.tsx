import React, {ChangeEvent, PropsWithChildren, useMemo, useState} from "react";
import {
  Box,
  Button,
  Flex, FormControl, FormLabel,
  Heading,
  LightMode,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { useIsLargeScreen } from "../utils/screenSize";
import { useMutation, useQuery } from "react-query";
import { TorrClient } from "../utils/TorrClient";
import { IoCheckmark } from "react-icons/io5";
import {Input} from "@chakra-ui/input";

export interface TorrentDownloadBoxProps {
  title?: string;
  magnetURL?: string;
  onSelect?: () => Promise<string>;
}

const TorrentDownloadBox = ({
  magnetURL,
  title,
  onSelect,
  children,
}: PropsWithChildren<TorrentDownloadBoxProps>) => {

  const { data: categories } = useQuery(
    "torrentsCategory",
    TorrClient.getCategories
  );
  
  const Categories = useMemo(() => {
    return Object.values(categories || {}).map((c) => ({
      label: c.name,
      value: c.name,
      path: c.savePath
    }));
  }, [categories]);


  const isLarge = useIsLargeScreen();

  const { mutate, isLoading, isSuccess } = useMutation(
    "addBox",
    (magnetURLParam: string) => TorrClient.addTorrent("urls", magnetURLParam, selectedCategory, downloadPath)
  );

  const {
    mutate: callbackMutation,
    isLoading: callbackLoading,
    isSuccess: callbackSuccess,
  } = useMutation("addBoxWithCallback", () => onSelect!(), {
    onSuccess: (magnetURL) => mutate(magnetURL),
  });

  const bgColor = useColorModeValue("grayAlpha.200", "grayAlpha.400");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [downloadPath, setDownloadPath] = useState("");

  const handleChange = (categoryName: string) => {
    setSelectedCategory(categoryName);

    for (let c of Categories) {
      if (categoryName === 'Anime' && c.label === 'Anime') {
        setDownloadPath('');
        break;
      } else if (categoryName === 'Games' && c.label === 'Games') {
        setDownloadPath(c.path);
        break;
      } else if (categoryName === 'Movies' && c.label === 'Movies') {
        setDownloadPath(c.path);
        break;
      } else if (categoryName === 'Series' && c.label === 'Series') {
        setDownloadPath('');
        break;
      }
    }
  }

  return (
    <Flex
      p={3}
      bgColor={bgColor}
      width={"100%"}
      justifyContent={"space-between"}
      rounded={6}
      alignItems={"center"}
      gap={3}
      wrap={{ base: "wrap", lg: "nowrap" }}
    >
      <Box flexGrow={2}>
        {title && (
          <Heading wordBreak={"break-all"} size={"md"} mb={2}>
            {title}
          </Heading>
        )}
        {children}

        {Categories.length && (
                <FormControl>
                  <FormLabel>{"Category"}</FormLabel>
                  <Select
                    placeholder="Select category"
                    value={selectedCategory}
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    {Categories.map((c) => (
                      <option key={c.label}>{c.label}</option>
                    ))}
                  </Select>
                </FormControl>
        )}

        <FormLabel>{"Download Path"}</FormLabel>
          <Input
              _disabled={{ bgColor: "gray.50" }}
              value={downloadPath}
              onChange={(e) => setDownloadPath(e.target.value)}
          />
      </Box>
      <LightMode>

        <Button
          minW={32}
          disabled={
            isSuccess || callbackSuccess || callbackLoading || isLoading
          }
          isLoading={isLoading || callbackLoading}
          colorScheme={"blue"}
          width={!isLarge ? "100%" : undefined}
          onClick={() => {
            if (magnetURL) {
              mutate(magnetURL);
            } else if (onSelect) {
              callbackMutation();
            }
          }}
          leftIcon={isSuccess ? <IoCheckmark /> : undefined}
        >
          {isSuccess ? "Added" : "Download"}
        </Button>
      </LightMode>
    </Flex>
  );
};

export default TorrentDownloadBox;
