<template>
  <v-card
    class="mx-auto text-center"
    color="white"
    dark
    max-width="800"
  >
    <v-card-text>
      <v-sheet color="#ddd">
        <v-sparkline
          :value="value"
          color="rgb(109, 199, 109)"
          :gradient="['rgb(109, 199, 109)']"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}FCFA
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

  </v-card>
</template>

<script>
  export default {
    data: () => ({
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
    }),
  }
</script>
