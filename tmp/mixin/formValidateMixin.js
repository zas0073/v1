export const formValidateMixin = {
  data: () => ({
    valid: false,
  }),
  methods: {
    formValidate (form) {
      if (!this.$refs[form].validate()) {
        let invalidInput = this.$refs[form].inputs.find(child => {
          return child.valid === false
        })

        this.$dialog.message.warning(invalidInput.messagesToDisplay.join('\n'))

        this.$nextTick(() => {
          if (invalidInput.$refs['input']) {
            this.$vuetify.goTo(invalidInput.$refs['input']).then(() => invalidInput.$refs['input'].focus())
          }
          if (invalidInput.$refs['input-slot']) {
            this.$vuetify.goTo(invalidInput.$refs['input-slot'])
          }
        }
        )

        return false
      }
      return true

    },
    resetValidation (form) {
      this.$nextTick(() => {
        this.$refs[form].resetValidation()
      })
    }
  }
}
