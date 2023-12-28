// CarouselItem.js
import { Card, CardContent, CardMedia, Chip, Badge, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
	width: '300px',
	position: 'relative',
});

const StyledBadge = styled(Badge)({
	position: 'absolute',
	top: '10px',
	right: '10px',
});

function CarouselItem({ item }) {
	return (
		<StyledCard>
			<StyledBadge badgeContent={item.badge} color="error" />
			<CardMedia component="img" height="140" image={item.image} alt={item.title} />
			<CardContent>
				<Typography variant="h5" component="div">
					{item.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{item.description}
				</Typography>
				<Chip label={item.chip} />
				<Button variant="contained" onClick={item.onClick}>
					Click me
				</Button>
			</CardContent>
		</StyledCard>
	);
}

export default CarouselItem;