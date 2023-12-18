import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { WeekItem } from 'types';
import StockExerciseImage from '../../../images/gen/cyberpunk-man-on-cliff.jpeg';

export interface ScheduleItemCardProps {
    handleOpenInfo?: (item: WeekItem) => void;
    item: WeekItem;
}

export default function ScheduleItemCard({ item, handleOpenInfo }: ScheduleItemCardProps) {

    return (
        <Card className='schedule-item-card' sx={{ display: 'flex', maxHeight: "7rem" }}>
            <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={StockExerciseImage}
                alt="itemImage"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ textAlign: "left" }} sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="body1">
                        {item.name}
                    </Typography>
                    <Typography style={{ wordBreak: "break-all" }} variant="body2" color="text.secondary" component="div">
                        {item.description?.length > 65 ? item.description.slice(0, 65).concat("...") : item.description}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                {handleOpenInfo && (<IconButton size='small' color='primary' onClick={() => handleOpenInfo(item)}><KeyboardArrowRightIcon fontSize='small' /></IconButton>)}
            </CardActions>
        </Card>
    );
}