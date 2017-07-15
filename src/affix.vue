<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            /**
             * The relative element selector string. The relative element is
             * the element you want your affix to be related to, as it will
             * not be related to the window.
             *
             * @example '#contact'
             * @type {String}
             */
            relativeElementSelector: {
                type: String,
                required: true
            },

            /**
             * This is the offset margin between the top/bottom of the window
             * before the affix is applied.
             *
             * @type {Object}
             */
            offset: {
                type: Object,
                default: () => {
                    return {
                        top: 40,
                        bottom: 40
                    }
                }
            }
        },

        computed: {
            /**
             * Computes the relative element selector to a selector.
             *
             * @return {Element} document.querySelector(this.relativeElementSelector)
             */
            relativeElement() {
                return document.querySelector(this.relativeElementSelector);
            }
        },

        data() {
            return {
                elementDistanceFromTop: null,
                elementEnd: null,
                lastState: null,
                currentState: null
            }
        },

        methods: {
            onScroll() {
                let distanceFromTop = window.scrollY;

                if (distanceFromTop < this.elementDistanceFromTop - this.offset.top) {
                    this.currentState = 'affix-top';

                    if (this.currentState != this.lastState) {
                        // To make sure it will not fire right after component is mounted
                        if (this.lastState) this.$emit('affixtop');

                        this.$el.classList.remove('affix');
                        this.$el.classList.add('affix-top');
                    }
                }

                if (distanceFromTop >= this.elementDistanceFromTop - this.offset.top && distanceFromTop < this.elementEnd - this.offset.top) {
                    this.currentState = 'affix';
                    this.$el.style.top = `${this.offset.top}px`;

                    if (this.currentState != this.lastState) {
                        // To make sure it will not fire right after component is mounted
                        if (this.lastState) this.$emit('affix');

                        this.$el.classList.remove('affix-top');
                        this.$el.classList.remove('affix-bottom');
                        this.$el.classList.add('affix');
                    }
                }

                if (distanceFromTop >= this.elementEnd - this.offset.top) {
                    this.currentState = 'affix-bottom';
                    this.$el.style.top = `${this.elementEnd - distanceFromTop}px`;

                    if (this.currentState != this.lastState) {
                        // To make sure it will not fire right after component is mounted
                        if (this.lastState) this.$emit('affixbottom');

                        this.$el.classList.remove('affix');
                        this.$el.classList.add('affix-bottom');
                    }
                }

                this.lastState = this.currentState;
            }
        },

        mounted() {
            this.$el.classList.add('vue-affix');
            this.elementDistanceFromTop = this.relativeElement.offsetTop;
            let elementBottomDistanceFromTop = this.relativeElement.offsetHeight + this.elementDistanceFromTop;
            this.elementEnd = elementBottomDistanceFromTop - this.$el.offsetHeight - this.offset.bottom;

            this.onScroll();
            document.addEventListener('scroll', this.onScroll);
        },

        beforeDestroy() {
            document.removeEventListener('scroll', this.onScroll);
        }
    }
</script>

<style>
    .affix {
        position: fixed;
    }

    .affix-bottom {
        position: fixed;
    }
</style>
