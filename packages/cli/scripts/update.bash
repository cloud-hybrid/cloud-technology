#!/bin/bash --posix

echo "Running \"npm-upgrade\" for all packages and root" && echo

if [ -d ./package ]; then

    cd ./packages

    for package in * ; do
        if [ -d "$package" ]; then
            cd $package
            read -p "Upgrade package '$package' (y/N)? " yn
            case $yn in
                [Yy]* ) echo; npx npm-upgrade; echo
            esac
            cd ..
        fi
    done

    cd ..
fi

read -p "Upgrade root package (y/N)? " yn

case $yn in
    [Yy]* ) echo; npx npm-upgrade
esac
