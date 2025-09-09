<template>
  <div>
    <h1>Examiner Dashboard</h1>
    <div class="metrics">
      <h2>Your Metrics</h2>
      <p>Total Assignments: {{ totalAssignments }}</p>
      <p>Ungraded Assignments: {{ ungradedAssignments.length }}</p>
    </div>
    <div class="ungraded-assignments">
      <h2>Ungraded Assignments</h2>
      <ul>
        <li v-for="assignment in ungradedAssignments" :key="assignment.id">
          {{ assignment.title }} - Due: {{ assignment.dueDate }}
        </li>
      </ul>
    </div>
    <div class="proposals">
      <h2>Knowledge Sharing Proposals</h2>
      <ul>
        <li v-for="proposal in proposals" :key="proposal.id">
          {{ proposal.title }} - Submitted by: {{ proposal.submittedBy }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalAssignments: 0,
      ungradedAssignments: [],
      proposals: []
    };
  },
  created() {
    this.fetchMetrics();
    this.fetchUngradedAssignments();
    this.fetchProposals();
  },
  methods: {
    async fetchMetrics() {
      // Fetch total assignments from the backend
      const response = await fetch('/api/assignments/metrics');
      const data = await response.json();
      this.totalAssignments = data.totalAssignments;
    },
    async fetchUngradedAssignments() {
      // Fetch ungraded assignments from the backend
      const response = await fetch('/api/assignments/ungraded');
      const data = await response.json();
      this.ungradedAssignments = data.assignments;
    },
    async fetchProposals() {
      // Fetch knowledge-sharing proposals from the backend
      const response = await fetch('/api/proposals');
      const data = await response.json();
      this.proposals = data.proposals;
    }
  }
};
</script>

<style scoped>
.metrics, .ungraded-assignments, .proposals {
  margin: 20px 0;
}
h1 {
  color: #2c3e50;
}
h2 {
  color: #42b983;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
</style>