import { Command, Flags } from "@oclif/core";

import cliSelect from "cli-select";
import * as got from "got";
import { load } from "cheerio";

const colors = require("colors");
const Table = require("cli-table");

export default class Check extends Command {
  static description = "check server status for Lost Ark game";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    // flag with no value (-a, --all)
    all: Flags.boolean({
      char: "a",
      description: "Display status for all regions",
    }),
    autorefresh: Flags.boolean({
      char: "r",
      description: "Auto refresh the table after fixed interval",
    }),
  };

  static args = [];

  private setColor(status: string): string {
    switch (status) {
      case "full":
        return colors.blue(status);

      case "good":
        return colors.green(status);

      case "busy":
        return colors.yellow(status);

      case "maintenance":
      default:
        return colors.red(status);
    }
  }

  private displayServerTable(regions: any, region: any) {
    const servers = regions[region];

    const parenttable = new Table({
      head: [region],
      colAligns: ["middle"],
      style: {
        head: ["white", "bold", "inverse"],
      },
    });

    const table = new Table({
      head: ["Server Name", "Status"],
      style: {
        head: ["white", "bold", "inverse"],
      },
    });

    for (let index = 0; index < servers.length; index++) {
      const { servername, serverstatus } = servers[index];
      table.push([servername, this.setColor(serverstatus)]);
    }

    parenttable.push([table]);

    console.clear();
    console.log(parenttable.toString());
  }

  private async continueGetUpdate(regions: any, region: any) {
    const res = await got(
      "https://www.playlostark.com/en-gb/support/server-status"
    );
    const $ = load(res.body);

    const regionsArray = Object.keys(regions);

    $(".ags-ServerStatus-content-responses")
      .find(".ags-js-serverResponse")
      .each((pindex, el: any) => {
        let currentRegion = regionsArray[el.attribs["data-index"]];
        regions[currentRegion] = [];
        el.children.forEach((element: any) => {
          let servername, serverstatus;
          if (element.type == "tag") {
            element.children.forEach((innerEl: any) => {
              if (
                innerEl.type == "tag" &&
                innerEl.attribs.class.includes(
                  "ags-ServerStatus-content-responses-response-server-name"
                ) &&
                innerEl.firstChild.nodeValue.trim()
              ) {
                servername = innerEl.firstChild.nodeValue.trim();
              }
              if (
                innerEl.type == "tag" &&
                innerEl.attribs.class.includes(
                  "ags-ServerStatus-content-responses-response-server-status-wrapper"
                )
              ) {
                serverstatus = innerEl.children[1].attribs.class
                  .split("-")
                  .pop();
              }
            });
            if (servername && serverstatus)
              regions[currentRegion].push({ servername, serverstatus });
          }
        });
      });

    if (region == "All") {
      for (const region in regions) {
        this.displayServerTable(regions, region);
      }
    } else {
      this.displayServerTable(regions, region);
    }
    setTimeout(() => {
      this.continueGetUpdate(regions, region);
    }, 1000);
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Check);

    const res = await got(
      "https://www.playlostark.com/en-gb/support/server-status"
    );
    const $ = load(res.body);

    const regions: any = {};
    $(".ags-ServerStatus-content-tabs")
      .find("a div")
      .each(
        (i, e: any) => (regions[e.firstChild.nodeValue.trim().trim("\n")] = [])
      );

    const regionsArray = Object.keys(regions);

    $(".ags-ServerStatus-content-responses")
      .find(".ags-js-serverResponse")
      .each((pindex, el: any) => {
        let currentRegion = regionsArray[el.attribs["data-index"]];
        el.children.forEach((element: any) => {
          let servername, serverstatus;
          if (element.type == "tag") {
            element.children.forEach((innerEl: any) => {
              if (
                innerEl.type == "tag" &&
                innerEl.attribs.class.includes(
                  "ags-ServerStatus-content-responses-response-server-name"
                ) &&
                innerEl.firstChild.nodeValue.trim()
              ) {
                servername = innerEl.firstChild.nodeValue.trim();
              }
              if (
                innerEl.type == "tag" &&
                innerEl.attribs.class.includes(
                  "ags-ServerStatus-content-responses-response-server-status-wrapper"
                )
              ) {
                serverstatus = innerEl.children[1].attribs.class
                  .split("-")
                  .pop();
              }
            });
            if (servername && serverstatus)
              regions[currentRegion].push({ servername, serverstatus });
          }
        });
      });

    let region = "All";

    if (!flags.all) {
      const { value } = await cliSelect({
        values: [...regionsArray, "All"],
        valueRenderer: (value: any, selected: any) => {
          if (selected) {
            return value;
          }

          return value;
        },
      });
      region = value;
    }

    if (region == "All") {
      for (const region in regions) {
        this.displayServerTable(regions, region);
      }
    } else {
      if (flags.autorefresh) {
        this.displayServerTable(regions, region);
        this.continueGetUpdate(regions, region);
      } else {
        this.displayServerTable(regions, region);
      }
    }
  }
}
