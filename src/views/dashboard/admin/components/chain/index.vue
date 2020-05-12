<template>
    <el-card class="chain-card-component" style="margin-left: 8px;">
<css-doodle click-to-update use="var(--rule)"></css-doodle>
    </el-card>
</template>

<script>
import CSSDoodle from 'css-doodle'
export default {
  components: {
    CSSDoodle
  }
}
</script>

<style>
  css-doodle {
    --phi: @calc(4 * π / @size * @i);
    --theta: @calc(10 * π / @size * @i);
    --r: 24vmin;
    --c: @p(#f85f73, #fbe8d3, #928a97);

    --rule: (
      :doodle {
        @grid: 240x1;
        transform-style: preserve-3d;
        animation: r 20s linear infinite;
        font-size: 2vmin;
        margin-top: -2em;
      }
      transform:
        translate3d(
          calc(var(--r) * @sin(var(--theta)) * @cos(var(--phi))),
          calc(var(--r) * @sin(var(--theta)) * @sin(var(--phi))),
          calc(var(--r) * @cos(var(--theta)))
        )
        rotateY(calc(@i * 1deg));

      will-change: transform;
      transform-style: preserve-3d;

      @place-cell: center;
      @size: @r(.3em, .8em);

      color: var(--c);

      :after {
        content: '';
        position: absolute;
        border-radius: 50%;
        left: 0; top: 0;
        @size: 100%;

        background: currentColor;
        box-shadow: @m6(
          0 calc(@lr * @n) 0 calc(-.05em - @n * .05em) 
          currentColor
        );

        will-change: transform;
        animation: r @r(.5s, 1.5s) linear infinite;
        animation-delay: -@r(500ms);
      }

      :before {
        content: '';
        border-left: 1px @p(solid, dashed, dotted) currentColor;
        position: absolute;
        left: 50%; top: 0;
        @size: 1px @r(1em, 8em);
        transform: rotateY(calc(@i * 1deg));
      }

      @keyframes r {
        to { transform: rotateY(1turn) }
      }
    );
  }
  .chain-card-component {
    position: relative;
    height: 461.5px;
      margin: 0;
  display: grid;
  place-items: center;
  background: #1a1b30;
  }

  
</style>
