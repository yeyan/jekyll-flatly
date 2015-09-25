---
layout: post
title:  "Longest Common Subsequence"
date: 2015-09-25 19:05:50 
categories: haskell
--- 

Implementing longest common subsequence (LCS) in Haskell according to its mathematical definition is very simple.

```
lcs [] []               = []
lcs _  []               = []
lcs [] _                = []
lcs aa@(a:as) bb@(b:bs) =
    if a == b
        then a : lcs as bs
        else 
            let p1 = lcs aa bs
                p2 = lcs as bb
            in
                if length p1 > length p2
                    then p1
                    else p2
```

But the performance of this recursive algorithm is absolutely horrible.

```
*Main> lcs "star wars the clone" "star.wars.the.clone"
"starwarstheclone"
(15.17 secs, 5,888,228,928 bytes)
```

To improve the performance we have to record our temporary results in a matrix.
Therefore we don't have to waste time on those results that we have already calculated.

In comparison phrase the matrix is presented as a mutable 2 dimension array as copying array is a pretty expensive operation.
Once we finished the calculation we copied it into a immutable array, therefore we can use it in pure code.

```
import Data.Array
import Data.Array.IO

lcs lhs rhs = do
    let la = length lhs
        lb = length rhs
        as = array (1, la) $ zip [1..] lhs
        bs = array (1, lb) $ zip [1..] rhs
    cs <- newArray ((0, 0), (la, lb)) 0 :: IO (IOArray (Int, Int) Int)
    forM_ [1 .. la] $ \x -> do
        forM_ [1 .. lb] $ \y -> do
            let a = as ! x
                b = bs ! y
            if a == b
                then do
                    t <- readArray cs (x - 1, y -1)
                    writeArray cs (x, y) (t + 1)
                else do
                    t1 <- readArray cs (x, y - 1)
                    t2 <- readArray cs (x - 1, y)
                    writeArray cs (x, y) $ max t1 t2
    rlt <- freeze cs :: IO (Array (Int, Int) Int)
    return $ backtrace rlt as bs la lb

backtrace cs as bs i j
    | i == 0 || j == 0 = ""
    | otherwise        =
        let i' = i - 1 :: Int
            j' = j - 1 :: Int
            ca = as ! i
            cb = bs ! j
        in if ca == cb
                then backtrace cs as bs i' j' ++ [ca]
                else if  cs ! (i, j') > cs ! (i', j)
                        then backtrace cs as bs i j'
                        else backtrace cs as bs i' j

```

Although the code is longer but it is 1571 times faster than the recursive one.

```
*Main> lcs "star war the clone" "star.war.the.clone"
"starwartheclone"
(0.01 secs, 0 bytes)
```
