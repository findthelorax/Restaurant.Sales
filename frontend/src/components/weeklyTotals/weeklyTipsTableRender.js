import React from 'react';
import { Typography, Card, CardContent, CardHeader } from '@mui/material';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarDensitySelector,
	GridToolbarExport,
} from '@mui/x-data-grid';

export default function WeeklyTipsRender({ rows, columns }) {
	return (
		<Card style={{ height: '100%', width: '100%' }}>
			<CardHeader
				title={
					<Typography variant="h5" component="h2">
						Weekly Tip Totals
					</Typography>
				}
				titleTypographyProps={{ variant: 'h5', component: 'h2', gutterBottom: false }}
				style={{ paddingBottom: 0, marginBottom: 0 }}
			/>
			<CardContent>
				<DataGrid
					rows={rows}
					columns={columns}
					density="compact"
					hideFooter
					slots={{
						Toolbar: GridToolbarContainer,
					}}
					slotProps={{
						toolbar: {
							children: (
								<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
									<GridToolbarColumnsButton />
									<GridToolbarFilterButton />
									<GridToolbarDensitySelector />
									<GridToolbarExport />
								</div>
							),
						},
					}}
				/>
			</CardContent>
		</Card>
	);
}
