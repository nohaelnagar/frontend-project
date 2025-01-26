import { Skeleton } from "@mui/material";
import { StyledCard } from "./StyledCard";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";


function LoadingHeadlins() {
  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia>
          <Skeleton varient="image" height={200} sx={{ fontSize: "1.5rem" }} />
        </CardMedia>

      {/* {image && (
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="Sample article"
        />
      )} */}


        <CardContent>
          <Skeleton varient="text" sx={{ fontSize: "5rem" }} />
          <Skeleton varient="text" sx={{ fontSize: "1.5rem" }} />
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Skeleton varient="text" width={200} sx={{ fontSize: "1.5rem" }} />
        <Skeleton varient="text" width={200} sx={{ fontSize: "1.5rem" }} />
      </Box>
    </StyledCard>
  );
}

export default LoadingHeadlins;