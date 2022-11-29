import {Card, CardContent, CardMedia, Typography} from "@mui/material";

interface gifProps {
    url: string
    title: string
}

const Gif = ({ url, title }: gifProps) => {
    return (
      <Card sx={{width:200, height:300}}>
        <CardMedia image={url} component="img" loading="lazy" sx={{height:200, width:200}} />
        <CardContent>
          <Typography variant="body1">{title}</Typography>
        </CardContent>
      </Card>
    );

}

export default Gif