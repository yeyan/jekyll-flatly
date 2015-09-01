---
layout: post
title:  "XMonad Physical Screen Setup"
date:  2015-09-01 10:25:51
categories: xmonad xrandr
--- 

When use xmonad with multi monitors. We can spawn a xrandr process during xmonad startup to configure the monitors.

***Hint*** You may use arandr to generate xrandr options

    -- Setup physical monitors
    setupMonitors = do
        count <- countMonitors 
        -- only applies when external monitors are available
        when (count == 3) $
            spawn $ concat $ intersperse " "
                [ "xrandr"
                , "--output HDMI1"
                , "--mode 1920x1080"
                , "--pos 0x0"
                , "--rotate normal"
                , "--output LVDS1"
                , "--off"
                , "--output VIRTUAL1"
                , "--off "
                , "--output DP1"
                , "--off "
                , "--output VGA1"
                , "--mode 1920x1080"
                , "--pos 1920x0"
                , "--rotate normal"
                ]

    -- count physical monitors by count how my lines of "connected" in xrandr's output
    countMonitors = do
        (_, Just hout, _, _) <-
            createProcess (proc "xrandr" ["-q"]) 
                { env = Just [("DISPLAY", ":0")]
                , std_out = CreatePipe }
        length . filter (isInfixOf " connected") . lines <$> hGetContents hout


