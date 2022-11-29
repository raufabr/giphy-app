/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import './App.css';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Gif from './components/Gif';
import {GIPHY_URL, KEY, REQUEST_LIMIT} from "./constants/giphyAPIDetails";
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component";
import {VirtualizedGrid} from "@mierak/react-virtualized-grid";

interface ImageProps {
  id: string
  title: string
  images: {
    fixed_width: {
      url: string
    }
  }
}

interface GifsDataType<T>{
  data: T
}

type displayedGifsType = "trending" | "search"

function App() {
  const [gifsList, setGifsList] = useState<ImageProps[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [searchValue, setSearchValue] = useState<string>("")
  const [previousSearchValue, setPreviousSearchValue] = useState<string>("");

  const [currentGifsType, setCurrentGifsType] = useState<displayedGifsType>("trending");
  const handleSearchChange = (value: string) => setSearchValue(value)


  const fetchTrendingGifs = async () => {
    // Set the offset to zero if the user has removed the search results and it is not trending
    if (currentGifsType !== "trending")
      setOffset(0)
      
    await axios
      .get<GifsDataType<ImageProps[]>>(
        `${GIPHY_URL}/trending?api_key=${KEY}&limit=${REQUEST_LIMIT}&offset=${offset}`
      )
      .then((response) => {
        // If the results were trending already, then append to the dataset
        if (currentGifsType === "trending") {
          setGifsList([...gifsList, ...response.data.data]);
        // Else set the gif type and only keep the current copy
        } else {
          setGifsList(response.data.data)
          setCurrentGifsType("trending")
        }
        // Always increment the offset once the search has completed
        setOffset(offset + 1);
      });
    }
    
    useEffect(() => {
      fetchTrendingGifs();
    }, []);
  

  
  const fetchSearchGifs = () => {
    // Restart the search result if the user has typed/removed a new character
    if (searchValue !== previousSearchValue) { 
      setOffset(0)
    }
    axios
      .get<GifsDataType<ImageProps[]>>(
        `${GIPHY_URL}/search?api_key=${KEY}&limit=${REQUEST_LIMIT}&offset=${offset}&q=${searchValue}&lang=en`
      )
      .then((response) => {
        // This would only get call if the user has searched for something and is scrolling
        if (previousSearchValue  === searchValue) {
            setGifsList([...gifsList, ...response.data.data]);
        } else {
          // In the first instance when the user types in a character, add the gif type to be search search and update the search value
          setGifsList(response.data.data);
          setCurrentGifsType("search");
          setPreviousSearchValue(searchValue);
        }
        // Always increment the offset at the end of a response
        setOffset(offset+1)
      });
  }
  

  useEffect(() => {
    if (searchValue) { 
      fetchSearchGifs()
    }
    // If the search bar has been cleared then display trending gifs instead
    else if (!searchValue && currentGifsType === "search") {
      fetchTrendingGifs();
      setPreviousSearchValue("")
    }
  }, [searchValue]);
  
  const determineRequestType = () => {
    if (currentGifsType === "search")
      fetchSearchGifs()
    else
      fetchTrendingGifs()
  }

  return (
    <>
      <Header />
      <Box py="40px" px="3rem">
        <Box mb="2rem">
          <Searchbar value={searchValue} handleChange={handleSearchChange} />
        </Box>
        <Box mb="2rem">
          <Typography variant="h4">
            {currentGifsType === "trending"
              ? "Trending GIFs"
              : "Search results"}
          </Typography>
        </Box>

        {gifsList.length > 0 ? (
          <InfiniteScroll
            dataLength={gifsList.length}
            hasMore={offset <= 5000}
            loader={<>Loading...</>}
            endMessage="No more gifs"
            next={determineRequestType}>
            <VirtualizedGrid
              itemCount={gifsList.length}
              rowHeight={316}
              cellWidth={200}
              gridGap={2}
              gridHeight="90vh"
            >
              {(index) => <Gif url={gifsList?.[index]?.images.fixed_width.url} title={gifsList?.[index]?.title} key={index} />}
            </VirtualizedGrid>
            {/* Initial solution without a virtualised grid */}
            {/* <Grid container spacing={{xs: 1, md: 2}}>
              {gifsList.map(({title, id, images}, index) => (
                // Index is needed here because unfortunately we get duplicate gifs in the response at times
                <Grid key={`${id}-${index}`} item xs={6} sm={4} md={2}>
                  <Gif url={images.fixed_width.url} title={title} />
                </Grid>
              ))}
            </Grid> */}
          </InfiniteScroll>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default App;

