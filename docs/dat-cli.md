
The goal of this file is to introduce a user to the Dat CLI and go through a few examples of moving files.

* Install CLI
* Download a file (this file?) from peer
* Share file to (??)
* Full example with how you may use it for a dataset during research process.

---

# Dat Command Line Basics

The dat command line interface can be used to share, download, and sync files across many computers. 

In this guide, we will go over the basics of downloading and sharing files with Dat to get you acquainted with the tool.

## Installation

To use Dat you will need to have [node and npm installed](https://docs.npmjs.com/getting-started/installing-node). Once you have npm, you can install dat with npm:

```bash
npm install -g dat
```

The `-g` option installs dat globally allowing you to run it as a command. 

Running `dat` in the console, with no arguments, should show you this output:

```bash
dat <directory>

  share directory and create a dat-link

  --snapshot            create a snapshot of directory
  --port, -p            set a specific inbound tcp port

dat <dat-link> <directory>

  download a dat-link into directory

  --exit                exit process after download finishes
  --port, -p            set a specific inbound tcp port

general options

  --version, -v         get installed dat version
  --doctor              run dat doctor
  --quiet, -q           output only dat-link, no progress information
  --debug               show debugging output
```

## 1. Checking your Dat version

For our first command, we will print out the version of Dat. Knowing the version is really helpful if you run into any bugs, so this command is handy to know. 

Check your Dat version:

```bash
dat -v
```

You should see [semantic version](http://semver.org/) printed, `11.1.2`.

## 2. Downloading Files

Okay! We have Dat installed, now let's use it! We are going to download some files using Dat. 

You tell Dat what files to download by giving it a Dat link. Dat links are 64 character strings, for example `d6e1875598fae25165eff440ffd01513197ad0db9dbb9898f2a141288b9322c6`. 

Along with the link, you need to tell Dat what directory to download the files to. So all together, you can download files by typing `dat <dat-link> <download-directory>`.

For this example, we are going to download these documentation files, at **<add-link-here>**. In your console, run `dat <add-link-here> dat_docs` and you should see similar output:

```bash
$ dat <add-link-here> ~/Downloads/dat_docs
Downloading in /Users/joe/Downloads/dat_docs

Share Link: <add-link-here>
The Share Link is secret and only those you share it with will be able to get the files

[===>          ] Downloading 180 files (79.01 kB/498.4 MB)

Connected to 1 peers. Downloading 10 mB/s. 
```

Dat will start downloading the data into the `dat_docs` folder. Once the download is finished (a message will print and the bar will turn green), you can safely exit the process with `Ctrl-C` (`Cmd-C` on Mac). 

While downloading, you may be connected to more than 1 peer. Anyone who has the Dat link will be able to download and re-host a copy of the data. So you may be downloading from (and sharing to) other people that are also doing this tutorial! You only need one block of data to start helping as a host. It's distributed mad science!

### Updating the Downloaded Files

What happens if the files get updated? Dat auto-syncs new files. So if you still have the process open it will download the new files. If you exited the process, you can run the same command you ran before (with the same link and directory) and the files will update!

## 3. Sharing Files



Share a directory by typing `dat <directory>`:

```
$ dat my_data/
Sharing /Users/joe/my_data

Share Link: d6e1875598fae25165eff440ffd01513197ad0db9dbb9898f2a141288b9322c6
The Share Link is secret and only those you share it with will be able to get the files

[==============>] Added 21 files (448.41 MB/448.41 MB)

Connected to 2 peers. Uploading 5 mBd/s. Watching for updates...
```

You are now publishing that data from your computer. It will be publicly accessible as long as your terminal is open. The hash is a **secret hash**, your data is visible to anyone you send the hash to. As you add more files to the folder, dat will update and share the new files.


### Updating Files

Dat makes it easy to share a folder and send files as they are added to the folder. By default, when you share using `dat my_data/` you will be in live sync mode. Anyone connected to you will receive new files.

### Creating a snapshot

A snapshot reads the files and creates a unique link that will never change as long as the files don't change. To create a snapshot use the snapshot option: `dat my_data/ --snapshot`. Snapshots are automatically created for you in live mode.
