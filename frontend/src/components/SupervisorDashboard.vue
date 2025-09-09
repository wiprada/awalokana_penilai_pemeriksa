<template>
  <div>
    <h1>Supervisor Dashboard</h1>
    <div>
      <h2>Examiner Metrics</h2>
      <ul>
        <li v-for="examiner in examiners" :key="examiner.id">
          {{ examiner.name }} - Pending Evaluations: {{ examiner.pendingEvaluations }}
        </li>
      </ul>
    </div>
    <div>
      <h2>Pending Evaluations</h2>
      <ul>
        <li v-for="evaluation in pendingEvaluations" :key="evaluation.id">
          {{ evaluation.assignmentTitle }} - Due Date: {{ evaluation.dueDate }}
        </li>
      </ul>
    </div>
    <div>
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
      examiners: [],
      pendingEvaluations: [],
      proposals: []
    };
  },
  created() {
    this.fetchExaminers();
    this.fetchPendingEvaluations();
    this.fetchProposals();
  },
  methods: {
    async fetchExaminers() {
      // Fetch examiners data from the backend
      const response = await fetch('/api/examiners');
      this.examiners = await response.json();
    },
    async fetchPendingEvaluations() {
      // Fetch pending evaluations data from the backend
      const response = await fetch('/api/evaluations/pending');
      this.pendingEvaluations = await response.json();
    },
    async fetchProposals() {
      // Fetch knowledge sharing proposals from the backend
      const response = await fetch('/api/proposals');
      this.proposals = await response.json();
    }
  }
};
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
h2 {
  margin-top: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
</style>