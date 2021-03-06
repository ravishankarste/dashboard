import { LogStreamState, PodProperty } from "./logStream.types";
import { RawLogLevel } from "./logStream.types";

export const SHOW_LOG_INDEX = "SHOW_LOG_INDEX";
export const HANDLE_NEW_LOG = "HANDLE_NEW_LOG";

export const intialLogStreamState: LogStreamState = {
  logIndex: 0,
  logLevelOccurrences: {},
  logs: [],
  logLevels: {
    INFO: 0,
    SUCCESS: 0,
    WARNING: 0,
    ERROR: 0,
    CRITICAL: 0,
    DEBUG: 0,
  },
  logSources: {},
};

export const getInitialLogLevel = (): RawLogLevel => ({
  lastLog: 0,
  levels: {
    INFO: 0,
    SUCCESS: 0,
    WARNING: 0,
    ERROR: 0,
    CRITICAL: 0,
    DEBUG: 0,
  },
});

export const PROPERTY_LIST: PodProperty[] = [
  {
    name: "uses",
    type: "str",
  },
  {
    name: "replicas",
    type: "int",
  },
  {
    name: "read_only",
    type: "bool",
  },
  {
    name: "separated_workspace",
    type: "bool",
  },
  {
    name: "host",
    type: "str",
  },
  {
    name: "port_grpc",
    type: "int",
  },
  {
    name: "identity",
    type: "str",
  },
  {
    name: "image",
    type: "str",
  },
  {
    name: "entrypoint",
    type: "str",
  },
  {
    name: "pull_latest",
    type: "bool",
  },
  {
    name: "volumes",
    type: "str",
  },
  {
    name: "port_in",
    type: "int",
  },
  {
    name: "port_out",
    type: "int",
  },
  {
    name: "host_in",
    type: "str",
  },
  {
    name: "host_out",
    type: "str",
  },
  {
    name: "socket_in",
    type: "SocketType",
  },
  {
    name: "socket_out",
    type: "SocketType",
  },
  {
    name: "port_ctrl",
    type: "int",
  },
  {
    name: "ctrl_with_ipc",
    type: "bool",
  },
  {
    name: "timeout",
    type: "int",
  },
  {
    name: "timeout_ctrl",
    type: "int",
  },
  {
    name: "timeout_ready",
    type: "int",
  },
  {
    name: "dump_interval",
    type: "int",
  },
  {
    name: "exit_no_dump",
    type: "bool",
  },
  {
    name: "replica_id",
    type: "int",
  },
  {
    name: "check_version",
    type: "bool",
  },
  {
    name: "array_in_pb",
    type: "bool",
  },
  {
    name: "num_part",
    type: "int",
  },
  {
    name: "memory_hwm",
    type: "int",
  },
  {
    name: "runtime",
    type: "str",
  },
  {
    name: "max_idle_time",
    type: "int",
  },
  {
    name: "log_sse",
    type: "bool",
  },
  {
    name: "log_remote",
    type: "bool",
  },
  {
    name: "log_profile",
    type: "bool",
  },
  {
    name: "max_message_size",
    type: "int",
  },
  {
    name: "proxy",
    type: "bool",
  },
  {
    name: "replica_type",
    type: "ReplicaType",
  },
  {
    name: "shutdown_idle",
    type: "bool",
  },
];
