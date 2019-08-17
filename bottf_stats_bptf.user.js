// ==UserScript==
// @name            Bot.tf stats backpack.tf integration
// @namespace       https://bot.tf
// @description     This user script integrates Bot.tf stats with the backpack.tf website

// @require         https://code.jquery.com/jquery-3.4.1.slim.min.js

// @homepageURL     https://github.com/dyhli/plugin-bottf-stats-bptf
// @supportURL      https://github.com/dyhli/plugin-bottf-stats-bptf/issues
// @downloadURL     https://github.com/dyhli/plugin-bottf-stats-bptf/raw/master/bottf_stats_bptf.user.js
// @updateURL       https://github.com/dyhli/plugin-bottf-stats-bptf/raw/master/bottf_stats_bptf.user.js

// @version         0.4
// @author          Yuan Hao "Danny" Li <danny@exploriment.io>

// @match           https://backpack.tf/stats/*
// @match           https://backpack.tf/item/*
// @match           https://backpack.tf/suggestion/*
// @run-at          document-end
// @grant           none
// ==/UserScript==

(function($) {
    'use strict';

    let Item = $('.stats-header-item .item');
    if (Item.length === 0)
    {
        Item = $('.history-sheet .item-list .item, .suggestion .item');
    }

    if (Item.length === 1)
    {
        const ItemData = {
            def: Item.data('defindex'),
            q: Item.data('quality'),
            craft: Item.data('craftable')
        };

        if (Item.data('effect_name'))
        {
            ItemData.ef = Item.data('effect_name');
        }

        if (Item.data('australium'))
        {
            ItemData.aus = '1';
        }

        if (Item.data('ks_tier'))
        {
            ItemData.ks = Item.data('ks_tier');
        }

        $('#classifieds').append(`
            <a class="btn btn-default" href="${generateSnapshotLink(ItemData)}" target="_blank"><i class="fa fa-history fa-fw"></i> Bot.tf snapshots</a>
            <a class="btn btn-default" href="${generateStatsLink(ItemData)}" target="_blank"><i class="fa fa-bar-chart fa-fw"></i> Bot.tf stats</a>
        `);
        $('.panel:first .panel-extras').append(`
            <a class="btn btn-panel" href="${generateSnapshotLink(ItemData)}" target="_blank"><i class="fa fa-history fa-fw"></i> Bot.tf snapshots</a>
            <a class="btn btn-panel" href="${generateStatsLink(ItemData)}" target="_blank"><i class="fa fa-bar-chart fa-fw"></i> Bot.tf stats</a>
        `);
    }

    /**
     * Generate the URL parameters
     * @param options
     * @return {object}
     */
    function generateParams(options)
    {
        return Object.assign({
            def: undefined,
            q: 6,
            ef: '',
            craft: 1,
            aus: 0,
            ks: 0,
            source: 'browser_script'
        }, options);
    }

    /**
     * Generate the link for a snapshot
     * @param options
     * @return {string}
     */
    function generateSnapshotLink(options)
    {
        options = generateParams(options);

        return 'https://bot.tf/stats/listings?' +
            $.param(options);
    }

    /**
     * Generate the link for stats
     * @param options
     * @return {string}
     */
    function generateStatsLink(options)
    {
        options = generateParams(options);

        return 'https://bot.tf/stats/item?' +
            $.param(options);
    }
})($);
