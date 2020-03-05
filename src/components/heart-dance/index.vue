<template>
  <div id="dance-heart">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}

#dance-heart {
 position: relative;
 top:80px;
 left:20px
}
ul {
  height: 200px;
}

li {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 20px;
}
li:nth-child(1) {
  background-color: #f62e74;
  animation: love1 4s infinite;
}
li:nth-child(2) {
  background-color: #f45330;
  animation: love2 4s infinite;
  animation-delay: 0.15s;
}
li:nth-child(3) {
  background-color: #ffc883;
  animation: love3 4s infinite;
  animation-delay: 0.3s;
}
li:nth-child(4) {
  background-color: #30d268;
  animation: love4 4s infinite;
  animation-delay: 0.45s;
}
li:nth-child(5) {
  background-color: #006cb4;
  animation: love5 4s infinite;
  animation-delay: 0.6s;
}
li:nth-child(6) {
  background-color: #784697;
  animation: love4 4s infinite;
  animation-delay: 0.75s;
}
li:nth-child(7) {
  background-color: #ffc883;
  animation: love3 4s infinite;
  animation-delay: 0.9s;
}
li:nth-child(8) {
  background-color: #f45330;
  animation: love2 4s infinite;
  animation-delay: 1.05s;
}
li:nth-child(9) {
  background-color: #f62e74;
  animation: love1 4s infinite;
  animation-delay: 1.2s;
}

@keyframes love1 {
  30%,
  50% {
    height: 60px;
    transform: translateY(-30px);
  }
  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}
@keyframes love2 {
  30%,
  50% {
    height: 125px;
    transform: translateY(-60px);
  }
  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}
@keyframes love3 {
  30%,
  50% {
    height: 160px;
    transform: translateY(-75px);
  }
  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}
@keyframes love4 {
  30%,
  50% {
    height: 180px;
    transform: translateY(-60px);
  }
  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}
@keyframes love5 {
  30%,
  50% {
    height: 190px;
    transform: translateY(-45px);
  }
  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}
</style>