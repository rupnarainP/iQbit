import { StatWithIcon } from "./StatWithIcon";
import { IoArchiveSharp, IoCube, IoFilm, IoTv } from "react-icons/io5";
import filesize from "filesize";
import { SimpleGrid } from "@chakra-ui/react";
import { torrentBoxIconProps } from "../searchAPIs/yts";

export interface TorrentMovieDataProps {
  quality?: string;
  type?: string;
  size?: number | string;
  numberOfFiles?: string;
}

const TorrentMovieData = (props: TorrentMovieDataProps) => {
  if(props.numberOfFiles === '') {
    return (
      <SimpleGrid gap={3} width={"100%"} columns={3} mb={1}>
        <StatWithIcon
          lit
          icon={<IoTv {...torrentBoxIconProps} />}
          label={props.quality}
        />
        <StatWithIcon
          lit
          icon={<IoFilm {...torrentBoxIconProps} />}
          label={props.type}
        />
        <StatWithIcon
          lit
          icon={<IoCube {...torrentBoxIconProps} />}
          label={
            typeof props.size === "string"
              ? props.size
              : filesize(props.size || 0, { round: 1 })
          }
        />
      </SimpleGrid>
    );
  } else {
    return (
      <SimpleGrid gap={3} width={"100%"} columns={4} mb={1}>
        <StatWithIcon
          lit
          icon={<IoTv {...torrentBoxIconProps} />}
          label={props.quality}
        />
        <StatWithIcon
          lit
          icon={<IoFilm {...torrentBoxIconProps} />}
          label={props.type}
        />
        <StatWithIcon
          lit
          icon={<IoCube {...torrentBoxIconProps} />}
          label={
            typeof props.size === "string"
              ? props.size
              : filesize(props.size || 0, { round: 1 })
          }
        />
        <StatWithIcon
                lit
                icon={<IoArchiveSharp {...torrentBoxIconProps} />}
                label={props.numberOfFiles}
        />
      </SimpleGrid>
    );
  }
};

export default TorrentMovieData;
