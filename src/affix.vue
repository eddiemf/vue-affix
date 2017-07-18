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
            },

            /**
             * Checks if the plugin should be enabled/disabled based
             * on true/false, good for conditional rendering like
             * mobile behavior.
             *
             * @type {Boolean}
             */
            enabled: {
                type: Boolean,
                default: true
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
                affixedElmOffsetTop: null,
                affixedElmMarginTop: null,
                relativeElmEnd: null,
                lastState: null,
                currentState: null
            }
        },

        methods: {
            onScroll() {
                if (!this.enabled) {
                    this.removeClasses();
                    return;
                }

                let distanceFromTop = window.scrollY;

                if (this.$el.offsetHeight + this.offset.top > this.relativeElement.offsetHeight) {
                    return;
                }

                if (distanceFromTop < this.getPosition(this.relativeElement).y - this.offset.top) {
                    this.currentState = 'affix-top';

                    if (this.currentState != this.lastState) {
                        // To make sure it will not fire right after component is mounted
                        if (this.lastState) this.$emit('affixtop');

                        this.removeClasses();
                        this.$el.classList.add('affix-top');
                    }
                } else if (distanceFromTop >= this.getPosition(this.relativeElement).y - this.offset.top && distanceFromTop < this.relativeElmEnd - this.$el.offsetHeight - this.affixedElmMarginTop - this.offset.bottom) {
                    this.currentState = 'affix';
                    this.$el.style.top = `${this.affixedElmMarginTop}px`;

                    if (this.currentState != this.lastState) {
                        // To make sure it will not fire right after component is mounted
                        if (this.lastState) this.$emit('affix');

                        this.removeClasses();
                        this.$el.classList.add('affix');
                    }
                } else if (distanceFromTop >= this.relativeElmEnd - this.$el.offsetHeight - this.affixedElmMarginTop - this.offset.bottom) {
                    this.currentState = 'affix-bottom';
                    this.$el.style.top = `${this.relativeElmEnd - this.offset.bottom - this.$el.offsetHeight -  distanceFromTop}px`;

                    if (this.currentState != this.lastState) {
                        // To make sure it will not fire right after component is mounted
                        if (this.lastState) this.$emit('affixbottom');

                        this.removeClasses();
                        this.$el.classList.add('affix-bottom');
                    }
                }

                this.lastState = this.currentState;
            },

            removeClasses() {
                this.$el.classList.remove('affix-top');
                this.$el.classList.remove('affix');
                this.$el.classList.remove('affix-bottom');
            },

            getPosition(element) {
                let xPosition = 0;
                let yPosition = 0;

                while (element) {
                    xPosition += (element.offsetLeft);
                    yPosition += (element.offsetTop);
                    element = element.offsetParent;
                }

                return { x: xPosition, y: yPosition };
            }
        },

        mounted() {
            this.$el.classList.add('vue-affix');

            this.affixedElmOffsetTop = this.getPosition(this.$el).y;
            this.affixedElmMarginTop = this.affixedElmOffsetTop - this.getPosition(this.relativeElement).y + this.offset.top;
            this.relativeElmEnd = this.relativeElement.offsetHeight + this.getPosition(this.relativeElement).y;

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
