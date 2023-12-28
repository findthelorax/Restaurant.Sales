import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    IconButton,
    Grid,
    Card,
    CardContent,
    Typography,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import TeamMemberForm from '../../components/teamMembers/teamMembersFormRender';
import { POSITIONS } from '../../utils/constraints';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
//! FIX TO USE TEAM MEMBERS CONTEXT
const TeamMembersPageRender = ({
    teamMemberFirstName,
    teamMembeLastName,
    setTeamMemberFirstName,
    setTeamMemberLastName,
    position,
    setPosition,
    addMember,
    deleteMember,
    teamByPosition,
    teamMembers,
    columns,
}) => {
    const { teamMembers } = useContext(TeamMembersContext);
    return (
        <Box sx={{ maxWidth: 300 }}>
            <Grid container spacing={2}>
                <Grid item xs={4} md={4} lg={4}>
                    <TeamMemberForm
                        teamMemberFirstName={teamMemberFirstName}
                        setTeamMemberFirstName={setTeamMemberFirstName}
                        teamMembeLastName={teamMembeLastName}
                        setTeamMemberLastName={setTeamMemberLastName}
                        position={position}
                        setPosition={setPosition}
                        addTeamMember={addMember}
                    />
                    {POSITIONS.map((position) => (
                        <Box key={position} sx={{ marginBottom: 2 }}>
                            <Card
                                sx={{
                                    backgroundColor: 'white',
                                    border: '1px solid black',
                                    boxShadow: '2px 2px 0px 0px black',
                                    borderRadius: '15px',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {capitalizeFirstLetter(position)}
                                    </Typography>
                                    {teamByPosition[position].map((member) => (
                                        <ListItem
                                            key={member._id}
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() =>
                                                        deleteMember(member._id, member.teamMemberFirstName, member.teamMemberLastName, member.position)
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FolderIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    member.teamMemberName
                                                        ? capitalizeFirstLetter(member.teamMemberName)
                                                        : 'Unknown'
                                                }
                                                secondary={member.position}
                                            />
                                        </ListItem>
                                    ))}
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={teamMembers}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(row) => row._id}
                            getRowClassName={(params) =>
                                params.rowIndex % 2 === 0 ? 'datagrid-row-even' : 'datagrid-row-odd'
                            }
                            pagination
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TeamMembersPageRender;