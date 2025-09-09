<template>
  <div>
    <h1>Examiner Dashboard</h1>
    <section>
      <h2>Your Metrics</h2>
      <p>Total Assignments: {{ metrics.totalAssignments }}</p>
      <p>Graded Assignments: {{ metrics.gradedAssignments }}</p>
      <p>Ungraded Assignments: {{ metrics.ungradedAssignments }}</p>
    </section>
    <section>
      <h2>Ungraded Assignments</h2>
      <ul>
        <li v-for="assignment in ungradedAssignments" :key="assignment.id">
          {{ assignment.title }} - Due: {{ assignment.dueDate }}
        </li>
      </ul>
    </section>
    <section>
      <h2>Knowledge Sharing Proposals</h2>
      <ul>
        <li v-for="proposal in proposals" :key="proposal.id">
          {{ proposal.title }} - Submitted by: {{ proposal.submittedBy }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      metrics: {
        totalAssignments: 0,
        gradedAssignments: 0,
        ungradedAssignments: 0,
      },
      ungradedAssignments: [],
      proposals: [],
    };
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.fetchMetrics();
    this.fetchUngradedAssignments();
    this.fetchProposals();
  },
  methods: {
    async fetchMetrics() {
      // Fetch metrics related to the examiner
      const response = await fetch(`/api/metrics/examiner/${this.user.id}`);
      this.metrics = await response.json();
    },
    async fetchUngradedAssignments() {
      // Fetch ungraded assignments for the examiner
      const response = await fetch(`/api/assignments/ungraded/${this.user.id}`);
      this.ungradedAssignments = await response.json();
    },
    async fetchProposals() {
      // Fetch knowledge-sharing proposals submitted by other examiners
      const response = await fetch('/api/proposals');
      this.proposals = await response.json();
    },
  },
};
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
section {
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f9f9f9;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>