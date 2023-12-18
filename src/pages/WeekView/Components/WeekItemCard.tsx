import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { ITheme } from 'common/App';
import * as React from 'react';
import { WeekItem } from 'types';


const StyledCard = styled(Card)(({ theme }) => `
background-color: ${alpha((theme as ITheme).palette.shades.g6, 0.8)};

`);

export interface WeekItemCardProps {

    item: WeekItem;
    imageSrc: string;
    onClick: () => void;
}


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function WeekItemCard({ item, imageSrc, children }: React.PropsWithChildren<WeekItemCardProps>) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.name}
                subheader={item.type}
            />
            <CardMedia
                component="img"
                height="194"
                image={imageSrc}
                alt="WorkoutImage"
            />
            <CardContent>
                <Typography style={{ wordWrap: "break-word" }} variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="quick-log"><Typography style={{ fontWeight: "bold" }} variant="caption">Log Workout</Typography></IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {children}
                </CardContent>
            </Collapse>
        </StyledCard>
    );
}