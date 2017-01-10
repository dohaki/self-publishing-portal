import {Template} from 'meteor/templating';

import './insertionCard.html';

Template.components_insertionCard.onRendered(function () {
    $('.slick-carousel').slick({
        infinite: true,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

Template.components_insertionCard.helpers({
    getProjectRate: (insertion) => {
        // TODO Differenzierung zwischen % und ETH
    },
    getUnit: (insertion) => {
        switch (insertion.valueType) {
            case 1: {
                return 'ETH/sold unit'
            }
            case 2: {
                return 'ETH/like'
            }
            case 3: {
                return 'ETH/share'
            }
        }

    }
});