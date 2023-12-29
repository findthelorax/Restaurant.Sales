import React from 'react';
import Grid from '@mui/material/Grid';
import TeamMembersList from '../../components/teamMembers/teamMembersList';
import TeamMembersForm from '../../components/teamMembers/teamMemberForm';

function TeamMembersPage() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <TeamMembersForm />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <TeamMembersList />
            </Grid>
        </Grid>
    );
}

export default TeamMembersPage;