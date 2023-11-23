import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { WeekItem } from 'types';
import StockExerciseImage from '../../images/gen/cyberpunk-man-on-cliff.jpeg';

export interface ScheduleItemCardProps {
    handleOpenInfo: (id: string) => void;
    item: WeekItem;
}

export default function ScheduleItemCard({ item, handleOpenInfo }: ScheduleItemCardProps) {

    return (
        <Card className='schedule-item-card' sx={{ display: 'flex', maxHeight: "8rem" }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={StockExerciseImage}
                alt="WorkoutImage"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="body1">
                        {item.name}
                    </Typography>
                    <Typography style={{ wordBreak: "break-all" }} variant="body2" color="text.secondary" component="div">
                        {item.description}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                <IconButton size='small' color='primary' onClick={() => handleOpenInfo(item.id)}><KeyboardArrowRightIcon fontSize='small' /></IconButton>
            </CardActions>
        </Card>
    );
}