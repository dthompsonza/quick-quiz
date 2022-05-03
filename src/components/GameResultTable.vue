<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="score in scoreboard">
                    <th>{{ score.questionNo }}</th>
                    <td>{{ score.givenAnswer }}</td>
                    <td>{{ score.givenAnswer === score.answer ? "" : score.answer }}</td>
                    <td>{{ score.result ? "✔" :"❌" }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps(['scoreboard'])
</script>

<style scoped>

</style>