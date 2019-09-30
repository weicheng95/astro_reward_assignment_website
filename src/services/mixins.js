// import dayjs from "dayjs";

export default {
  methods: {
    isEmptyObject(obj) {
      return Object.keys(obj).length === 0;
    },
    async toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async fileToBlob(file) {
      // convert file to base64 format
      const baseFile = await this.toBase64(file);

      // convert base64 to blob
      const binary = atob(baseFile.split(",")[1]);
      const array = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: file.type });
    },
    async processReward(idNumber, accNumber, rewardId, isRemember = false) {
      try {
        // redeem reward payload( idnumber, accnumber, rewardId )
        const redeemRes = await this.redeemReward(
          {
            IDNumber: idNumber,
            accountNumber: parseInt(accNumber, 0),
            rewardId,
          },
        );

        if (redeemRes.data) {
          const {
            IDNumber, accountNumber, rewardCode, redeemStartAt, redeemEndAt,
          } = redeemRes.data;

          // store in localstorage if user ticked isremember
          if (isRemember) {
            localStorage.user = JSON.stringify({ IDNumber, accountNumber });
          }

          // store redeem info in cookie
          this.$cookies.set(rewardId, JSON.stringify({
            rewardCode, redeemStartAt, redeemEndAt, IDNumber, accountNumber,
          }), "1h");
        }
      } catch (err) {
        alert(err.response.data);
      }
    },
    copyToClipboard(textToCopy) {
      // 1) Add the text to the DOM (usually achieved with a hidden input field)
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.value = textToCopy;

      // 2) Select the text
      input.focus();
      input.select();

      // 3) Copy text to clipboard
      const isSuccessful = document.execCommand("copy");

      // 4) Catch errors
      if (!isSuccessful) {
        console.error("Failed to copy text.");
      } else {
        alert("success copy to clipboard");
      }
    },
    isTimeExpired(timeToCompare) {
      return this.$dayjs().unix() > this.$dayjs(timeToCompare).unix();
    },
  },
};
